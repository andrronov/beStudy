import { describe, test, expect, beforeEach, beforeAll, afterAll } from "vitest"
import { nextTick } from "vue"
import { mount } from "@vue/test-utils"
import { createClient } from "@supabase/supabase-js"
import router from '../../router/index.js'
import loginPage from '../../pages/loginPage.vue'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

describe('Testing all from login/signup page', () => {
   let wrapper;

   beforeEach(() => {
      wrapper = mount(loginPage, {
        global: {
          stubs: {
            loadScreen: true // Заглушка для дочернего компонента
          }
        }
      });
    });

    test('renders login and signup form', async () => {
      expect(wrapper.find('#login_form').exists()).toBeTruthy()
      const toSignupButton = wrapper.find('#toSignupButton')
      await toSignupButton.trigger('click')
      await nextTick()
      expect(wrapper.find('#signup_form').exists()).toBeTruthy()
      expect(wrapper.find('#login_form').exists()).not.toBeTruthy()
    });

    test('login logic', async () => { 
      const {data, error} = supabase.auth.signInWithPassword({email: 'test@test', password: 'qwerty'})
      expect(error).toBeUndefined()

      // ДОПИСАТЬ ЛОГИКУ + ОТОБРАЖЕНИЕ КОМПОНЕНТОВ И UI

      // const loadScreen = wrapper.findComponent({name: 'loadScreen'})
      
      // const loginInput = wrapper.find('#email_input')
      // const signinButton = wrapper.find('#signinButton')
      // await loginInput.setValue('test@test')
      // const passwordInput = wrapper.find('#password_input')
      // await passwordInput.setValue('qwerty')
      // signinButton.trigger('click')
      // expect(loadScreen.exists()).toBe(false)
      // await wrapper.setData({isLoadScreen: true})
      // expect(loadScreen.exists()).toBe(true)
      // expect(wrapper.vm.user).toBeDefined()
    })
})