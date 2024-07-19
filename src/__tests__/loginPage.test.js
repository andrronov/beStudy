import { describe, test, expect, beforeEach, beforeAll, afterAll, vitest, vi } from "vitest"
import { nextTick } from "vue"
import { mount } from "@vue/test-utils"
import { supabaseMock } from "./__mocks__/supabase.js"
import { routerMock } from "./__mocks__/vue-router.js"
import loginPage from '../pages/loginPage.vue'
import { supabase } from "../lib/supabaseClient.js"

vi.mock('../lib/supabaseClient.js', () => ({
  supabase: supabaseMock
}))
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerMock.pushMock
  })
}))

describe('Testing all from login/signup page', () => {
   let wrapper, signInMock, signUpMock, router

   beforeEach(() => {
      wrapper = mount(loginPage, {
        global: {
          stubs: { loadScreen: true // Заглушка для дочернего компонента
          }}
      });
      signInMock = supabaseMock.auth.signInWithPassword
      signUpMock = supabaseMock.auth.signUp
      router = routerMock.pushMock
    });

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
      await wrapper.find('#email_input').setValue('test@test.com')
      await wrapper.find('#password_input').setValue('aaaaaa')
      await wrapper.find('#signinButton').trigger('click')

      expect(router).toBeCalledWith('/home')
      expect(signInMock).toBeCalledWith({email: 'test@test.com', password: 'aaaaaa'})

      expect(vi.isMockFunction(signInMock)).toBe(true)   
      expect(vi.isMockFunction(router)).toBe(true)   
    })
    test('error handling', async () => {
      // empty inputs
      expect(wrapper.find('#errorLog').exists()).not.toBeTruthy()
      await wrapper.find('#signinButton').trigger('click')
      expect(wrapper.find('#errorLog').exists()).toBeTruthy()
    })

    // сделать симуляцию введения неверных данных + проверка на показ loadScreen
    
    test('successfull signup logic', async () => {
      const toSignupButton = wrapper.find('#toSignupButton')
      await toSignupButton.trigger('click')
      await nextTick()
      await wrapper.find('.email_reg').setValue('reg@mail.com')
      await wrapper.find('.username_reg').setValue('test-reg')
      await wrapper.find('.pass_reg').setValue('pass-reg')

      await wrapper.find('#signUpButton').trigger('click')
      
      expect(vi.isMockFunction(signUpMock)).toBe(true)   
      expect(signUpMock).toBeCalledWith({email: 'reg@mail.com', password: 'pass-reg', options: {data: {username: 'test-reg'}, emailRedirectTo: 'http://localhost:5173/#/home'}})
      // console.log(wrapper.findComponent({name: 'loadScreen'}));
      expect(wrapper.findComponent({name: 'loadScreen'}).exists()).toBe(true)
      await nextTick()
      expect(wrapper.find('#errorLog').text()).toBe('Check your email!')
    })
})