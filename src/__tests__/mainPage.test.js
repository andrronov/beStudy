import { mount } from "@vue/test-utils"
import { describe, test, expect, beforeEach, vi, beforeAll, afterEach } from "vitest"
import { nextTick } from "vue"
import { routerMock } from "./__mocks__/vue-router"
import { supabaseMock } from "./__mocks__/supabase"
import mainPage from '../pages/mainPage.vue'

describe('testing main page', () => {
   let wrapper

   beforeAll(() => {
      vi.mock('../lib/supabaseClient.js', () => ({
        supabase: supabaseMock
      }))
      vi.mock('vue-router', () => ({
         useRouter: () => ({
           push: routerMock.pushMock
         })
       }))
   })

   beforeEach(() => {
      localStorage.clear()
      wrapper = mount(mainPage)
   })
   afterEach(() => {
      vi.resetAllMocks()
   })

   test('username display taken from db and write it in localStorage', async() => {
      const getUser = supabaseMock.auth.getUser
      const getSession = supabaseMock.auth.getSession
      expect(getUser).toHaveBeenCalledTimes(1)
      expect(getSession).toHaveBeenCalledTimes(1)
      expect(routerMock.push).not.toBeCalled()
      expect(wrapper.vm.userName).toBe('Test');
      expect(localStorage.getItem('username')).toBe('Test');
   })
   
   test('username display when its on localStorage', async() => {
      localStorage.setItem('username', 'Test')
      const newWrapper = mount(mainPage)
      await nextTick()
      const username = newWrapper.find('p.username')
      expect(username.text()).toBe('Welcome, Test!')
   })

   // router push when no session
   // проверить отображение пропсов
   // sign out
})