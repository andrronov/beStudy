import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
   {
      path: "/home",
      name: "main",
      component: () => import('../pages/mainPage.vue'),
   },
   {
      path: "/login",
      name: "login",
      component: () => import('../pages/loginPage.vue'),
   },
   {
      path: "/collection",
      name: "collection",
      component: () => import('../pages/testCollection.vue'),
   },
   {
      path: "/edit/:id",
      name: "edit",
      component: () => import('../pages/editCollection.vue'),
   },
   {
      path: "/test/:id",
      name: "test",
      component: () => import('../pages/takeTest.vue'),
   },
]

const router = createRouter({
   history: createWebHashHistory(),
   routes,
 });

export default router;