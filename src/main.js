import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import formatCurrency from './mixins/currencyFormatter'

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

Vue.prototype.$formatCurrency = formatCurrency
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
