// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetAlert from 'vue-sweetalert'
import VueCookies from 'vue-cookies'
import DatetimePicker from 'vuetify-datetime-picker'
import VueSocketio from 'vue-socket.io'
// import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(VueSocketio, 'http://203.151.50.143:3000')

Vue.use(DatetimePicker)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetAlert)
window.$ = window.jQuery = require('jquery')
Vue.use(VueCookies)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
