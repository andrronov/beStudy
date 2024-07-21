import { mount } from "@vue/test-utils"
import { describe, test, expect, beforeEach, vi, beforeAll, afterEach } from "vitest"
import { nextTick } from "vue"
import { routerMock } from "./__mocks__/vue-router"
import { supabaseMock } from "./__mocks__/supabase"
import mainPage from '../pages/mainPage.vue'

// vi.mock('../lib/supabaseClient.js', () => ({
//    supabase: supabaseMock
//  }))

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

   test('username display when its on localStorage', async() => {
      localStorage.setItem('username', 'Test')
      const newWrapper = mount(mainPage)
      await nextTick()
      const username = newWrapper.find('p.username')
      expect(username.text()).toBe('Welcome, Test!')
   })

   test('username display taken from db and write it in localStorage', async() => {
      // TO FIX !
      console.log('-----------', localStorage.getItem('username'));
      const getUser = supabaseMock.auth.getUser
      getUser.mockResolvedValue({
         data: { user: {user_metadata: { username: 'Test'}}}
       });
      const getSession = supabaseMock.auth.getSession
      getSession.mockResolvedValue(getSession)
      expect(getUser).toHaveBeenCalledTimes(1)
      await nextTick();
      expect(routerMock.push).not.toBeCalled()
      expect(wrapper.vm.userName).toBe('Test');
      expect(localStorage.getItem('username')).toBe('Test');
   })

   // проверить отображение пропсов
   // sign out
})