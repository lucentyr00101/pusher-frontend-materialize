import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import axios from 'axios'
import { baseURL } from '@/utils/baseURL'

Vue.use(Vuetify)
Vue.config.productionTip = false
axios.defaults.baseURL = baseURL()
console.log('Pusher Tutorial : https://pusher.com/tutorials/live-game-laravel')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
