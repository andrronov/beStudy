import { describe, test, expect, beforeEach, vi, beforeAll, afterEach } from "vitest"
import { nextTick } from "vue"
import { mount } from "@vue/test-utils"
import { supabaseMock } from "./__mocks__/supabase.js"
import { routerMock } from "./__mocks__/vue-router.js"
import loginPage from '../pages/loginPage.vue'

describe('Testing all from login/signup page', () => {
   let wrapper

   beforeAll(() => {
    vi.mock('../lib/supabaseClient.js', () => ({
      supabase: supabaseMock
    }))
    vi.mock('vue-router', () => ({
      useRouter: () => routerMock
    }))
   })

   beforeEach(() => {
      wrapper = mount(loginPage);
    });
    afterEach(() => {
      vi.resetAllMocks()
    })

    test('renders login and signup form', async () => {
      // Render login form
      expect(wrapper.find('#login_form').exists()).toBeTruthy()
      const inputs = wrapper.findAll('.forma')
      inputs.forEach(el => {
        expect(el.element.value).toBe('')
      })

      // Renders sign up form and hide login form
      const toSignupButton = wrapper.find('#toSignupButton')
      await toSignupButton.trigger('click')
      await nextTick()
      expect(wrapper.find('#signup_form').exists()).toBeTruthy()
      expect(wrapper.find('#login_form').exists()).not.toBeTruthy()
    });

    test('login + router logic', async () => {
      const signInMock = supabaseMock.auth.signInWithPassword
      signInMock.mockResolvedValue({
        data: { user: { id: 'e6f63a62-e7ff-4a36-a7dd-ae6e1fec5d26' } },
        error: null
      })
      await wrapper.find('#email_input').setValue('test@test.com')
      await wrapper.find('#password_input').setValue('aaaaaa')
      await wrapper.find('#signinButton').trigger('click')
      expect(wrapper.find('#loadScreen').exists()).toBeTruthy()
      await nextTick()
      expect(signInMock).toBeCalledWith({email: 'test@test.com', password: 'aaaaaa'})
      expect(routerMock.push).toBeCalledWith('/home')

      expect(vi.isMockFunction(signInMock)).toBe(true)   
      expect(vi.isMockFunction(routerMock.push)).toBe(true)   
    })

    test('handling error empty inputs', async () => {
      expect(wrapper.find('#errorLog').exists()).not.toBeTruthy()
      await wrapper.find('#signinButton').trigger('click')
      expect(wrapper.find('#errorLog').exists()).toBeTruthy()
    })
    test('wrong data error', async() => {
      const signInMock = supabaseMock.auth.signInWithPassword
      signInMock.mockRejectedValueOnce({data: {user: null, session: null}, error: {status: 400, message: "API Error"}})
      await wrapper.find('#email_input').setValue('error@test.com')
      await wrapper.find('#password_input').setValue('wrong-pass')
      await wrapper.find('#signinButton').trigger('click')
      expect(wrapper.find('#loadScreen').exists()).toBeTruthy()
      await nextTick()
      expect(signInMock).toBeCalledWith({email: 'error@test.com', password: 'wrong-pass'})
      await nextTick()
      expect(wrapper.find('#errorLog').exists()).toBeTruthy()
      expect(wrapper.find('#loadScreen').exists()).not.toBeTruthy()
    })

    test('successfull signup logic', async () => {
      const signUpMock = supabaseMock.auth.signUp
      signUpMock.mockResolvedValue(signUpMock)
      const toSignupButton = wrapper.find('#toSignupButton')
      await toSignupButton.trigger('click')
      await nextTick()
      await wrapper.find('.email_reg').setValue('reg@mail.com')
      await wrapper.find('.username_reg').setValue('test-reg')
      await wrapper.find('.pass_reg').setValue('pass-reg')

      await wrapper.find('#signUpButton').trigger('click')
      expect(wrapper.find('#loadScreen').exists()).toBeTruthy()
      
      
      expect(vi.isMockFunction(signUpMock)).toBe(true)   
      expect(signUpMock).toBeCalledWith({email: 'reg@mail.com', password: 'pass-reg', options: {data: {username: 'test-reg'}, emailRedirectTo: 'http://localhost:5173/#/home'}})
      expect(wrapper.findComponent({name: 'loadScreen'}).exists()).toBe(true)
      await nextTick()
      expect(wrapper.findComponent({name: 'loadScreen'}).exists()).not.toBe(true)
      expect(wrapper.find('#errorLog').text()).toBe('Check your email!')
    })
})