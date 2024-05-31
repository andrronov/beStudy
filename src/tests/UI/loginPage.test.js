import { describe, test, expect, beforeEach, beforeAll, afterAll } from "vitest"
import { nextTick } from "vue"
import { mount } from "@vue/test-utils"
import { createClient } from "@supabase/supabase-js"
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
      let toSignupButton = wrapper.find('#toSignupButton')
      await toSignupButton.trigger('click')
      await nextTick()
      expect(wrapper.find('#signup_form').exists()).toBeTruthy()
      expect(wrapper.find('#login_form').exists()).not.toBeTruthy()
    });

    test('login logic', async () => {
      const loginInput = wrapper.find('email_input')
      await loginInput.setValue('test@test')
      const passwordInput = wrapper.find('password_input')
      await passwordInput.setValue('qwerty')

      // expect(wrapper.vm.user).toBeDefined()
    })
})