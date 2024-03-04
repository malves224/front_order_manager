import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import formatCurrency from './mixins/currencyFormatter'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

Vue.prototype.$formatCurrency = formatCurrency
Vue.use(PiniaVuePlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  router,
  pinia: createPinia(),
  render: h => h(App)
}).$mount('#app')
