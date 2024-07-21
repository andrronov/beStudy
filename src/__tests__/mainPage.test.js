import { mount } from "@vue/test-utils"
import { describe, test, expect, beforeEach, vi, beforeAll, afterEach } from "vitest"
import { nextTick } from "vue"
import { routerMock } from "./__mocks__/vue-router"
import { supabaseMock } from "./__mocks__/supabase"
import mainPage from '../pages/mainPage.vue'
import HomeTemplate from "../components/UI/homeTemplate.vue"

describe('testing main page', () => {
   let wrapper, getUser, getSession

   beforeAll(() => {
      vi.mock('../lib/supabaseClient.js', () => ({
        supabase: supabaseMock
      }))
      vi.mock('vue-router', () => ({
         useRouter: () => routerMock
       }))
   })

   beforeEach(() => {
      wrapper = mount(mainPage);
      getUser = supabaseMock.auth.getUser.mockResolvedValue({
         data: { user: {user_metadata: { username: 'Test'}}}
       });
      getSession = supabaseMock.auth.getSession.mockResolvedValue({
         data: { session: { session: 'session' } }
       })
   })
   afterEach(() => {
      vi.resetAllMocks()
   })

   // TO FIX WHOLE TEST

   test('username display taken from db and write it in localStorage', async() => {
      // console.log('1 test ', homeSession.vm.session);
      expect(getUser).toHaveBeenCalledTimes(1)
      expect(getSession).toHaveBeenCalledTimes(1)
      expect(routerMock.push).not.toBeCalled()
      expect(wrapper.vm.userName).toBe('Test');
      expect(localStorage.getItem('username')).toBe('Test');
   })

   // test('router push to login page if no session', async() => {
      // console.log('2 test ', homeSession.vm.session);
      // const getSession = supabaseMock.auth.getSession
      // getSession.mockResolvedValue(getSession)
      // getSession.mockResolvedValue({data: {session: null}})
      // console.log('TTTTTT ', homeTemplateWrapper, 'hhhhhhhhhh ', homeTemplateWrapper.vm.session, 'ALLLLLL -> ', homeTemplateWrapper.vm.$data);
      // const homeVm = homeTemplateWrapper.vm
      // console.log('HHHHHHHHHHHHHHH ', homeVm.session);
      // expect(homeVm.session).toBe(true)
   // })
   
   test('username display when its on localStorage', async() => {
      localStorage.setItem('username', 'Test')
      const newWrapper = mount(mainPage)
      await nextTick()
      const username = newWrapper.find('p.username')
      expect(username.text()).toBe('Welcome, Test!')
   })

   // проверить отображение пропсов
   // sign out
})