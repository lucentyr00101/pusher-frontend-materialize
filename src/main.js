import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import axios from 'axios'
import { baseURL } from '@/utils/baseURL'
import Auth from '@/utils/auth'

Vue.use(Vuetify)
Vue.use(Auth)
Vue.config.productionTip = false
axios.defaults.baseURL = baseURL()
console.log('Pusher Tutorial : https://pusher.com/tutorials/live-game-laravel')

router.beforeEach(
  (to, from, next) => {

    //if user navigates to root path
    if(to.fullPath === '/'){
      //if user is not authenticated, redirect to login
      if(!Vue.auth.isAuthenticated()) {
        next({
          path: '/login'
        })
      } else {
        //if user is authenticated redirect to dashboard
        next({
          path: '/home'
        })
      }
    } else if(to.matched.some(component => component.meta.forVisitors)){

      if(Vue.auth.isAuthenticated()){
        next({
          path: '/home'
        })
      } else next()

    } else if(to.matched.some(component => component.meta.forAuth)) {
      
      if(!Vue.auth.isAuthenticated()){
        next({
          path: '/login'
        })
      } else next()

    } else next()

  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
