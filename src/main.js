import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'
import Dialog from 'vue-dialog-loading'
import OtpInput from '@bachdgvn/vue-otp-input'
import VueOtp2 from 'vue-otp-2'
import 'vue2-timepicker/dist/VueTimepicker.css'
import VueCookies from 'vue-cookies'
import VueCryptojs from 'vue-cryptojs'
import AudioVisual from 'vue-audio-visual'
import VueSessionStorage from 'vue-sessionstorage'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueCryptojs)

Vue.use(VueCookies)

Vue.use(VueOtp2)

Vue.use(AudioVisual)

Vue.use(VueSessionStorage)

Vue.component('v-otpinput', OtpInput)

Vue.use(VueApexCharts)

// const otpToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVjb25mZXJlbmNlIiwibmFtZSI6Im9uZWNvbmZlcmVuY2VAaW5ldCEiLCJpYXQiOjE1MTYyMzkwMjJ9.76dYYbFS1Hlv9vfu2hZ31a3qwA4p_5jYuLqYiBiHPmw'

axios.interceptors.request.use(async config => {
  const token = localStorage.getItem('user-token')
  const sharedtoken = localStorage.getItem('sharetoken')
  if (!config.url.includes('loginoneid')) {
    // if (config.url.includes('/api/otp/sendotp/')) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: 'Bearer ' + otpToken
    //   }
    // } else if (config.url.includes('/api/otp/checkotp/')) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: 'Bearer ' + otpToken
    //   }
    // } else
    if (config.url.includes('/api/auth/refreshToken')) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + token
      }
    } else if (
      config.url.includes('/api/v1/oneconf/service/checkroom') ||
      config.url.includes('/api/v1/oneconf/service/joinroom') ||
      config.url.includes('/api/v1/oneconf/service/createsession')
    ) {
    } else if (
      config.url.includes('/api/auth/sharedtoken')
    ) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + sharedtoken
      }
    } else if (token) {
      var jwt = require('jsonwebtoken')
      const jwtToken = Vue.CryptoJS.AES.decrypt(
        token,
        process.env.VUE_APP_SECRET_KEY
      ).toString(Vue.CryptoJS.enc.Utf8)

      var jwtDecode = jwtToken.replace(/"/g, '')

      var dataToken = jwt.decode(jwtDecode)
      var dateNow = Math.floor(Date.now() / 1000)
      // var date2 = Math.floor(new Date(2021, 5, 1, 17, 38, 0) / 1000)
      var condition = dataToken.exp - dateNow
      // var condition = date2 - dateNow
      if (condition < 0) {
        condition *= -1
      }
      if (condition <= 3600) {
        // if (dateNow > dataToken.exp) {
        // Vue.$cookies.remove('user-token')
        // localStorage.removeItem('user-token')
        // Vue.swal('WARNING !', 'Token expired, please sign in', 'warning')
        // window.location.href = '/'
        axios
          .post(process.env.VUE_APP_API + '/api/auth/refreshToken', {
            username: dataToken.user.username,
            email: dataToken.user.email,
            oneid: dataToken.user.oneid
          })
          .then(res => {
            localStorage.setItem('user-token', res.data.token)
            config.headers = {
              ...config.headers,
              Authorization: 'Bearer ' + res.data.token
            }
          })
          .catch(e => {
            Vue.swal.fire({
              title: 'Session timeout, please login again',
              text: '',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonText: 'OK',
              allowOutsideClick: false
            })
              .then(result => {
                if (result.value) {
                  localStorage.clear()
                  window.open('/', '_self')
                }
              })
          })
      } else {
        config.headers = {
          ...config.headers,
          Authorization: 'Bearer ' + token
        }
      }
      // config.headers = {
      //   ...config.headers,
      //   Authorization: 'Bearer ' + token
      // }
    }
  }
  return config
})

Vue.use(Dialog, {
  dialogBtnColor: '#0f0'
})
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(Vuex)

Vue.prototype.eventBus = new Vue()

Vue.prototype.$multiwatch = function (props, watcher) {
  var iterator = function (prop) {
    this.$watch(prop, watcher)
  }
  props.forEach(iterator, this)
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
