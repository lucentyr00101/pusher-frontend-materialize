import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login'),
      meta : {
        forVisitors: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/base/home'),
      meta : {
        forAuth: true
      }
    },
    {
      path: '/users',
      component: () => import('@/base/users'),
      meta: {
        forAuth: true
      },
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
