import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/base/home')
    },
    {
      path: '/users',
      component: () => import('@/base/users'),
      children: [
        {
          path: '/',
          component: () => import('@/views/users'),
          name: 'users'
        },
        {
          path: ':id',
          component: () => import('@/views/user-show'),
          name: 'user-show'
        },
        {
          path: ':id/edit',
          component: () => import('@/views/user-edit'),
          name: 'user-edit'
        }
      ]
    }
  ]
})
