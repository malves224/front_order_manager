import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import formatCurrency from './mixins/currencyFormatter'
import { formatCents } from './mixins/currencyFormatter'
import { createPinia, PiniaVuePlugin } from 'pinia'
import { ActionSheet, Loading } from 'vant';
import { VMoney } from 'v-money';
import CustomerService from './services/customerService'
import dateMixin from '@/mixins/dateMixin';



Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

Vue.prototype.$formatCurrency = formatCurrency
Vue.prototype.$formatCents = formatCents
Vue.prototype.$customerService = new CustomerService()
Vue.mixin(dateMixin);
Vue.use(PiniaVuePlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ActionSheet)
Vue.use(Loading)

Vue.directive('money', VMoney);

new Vue({
  router,
  pinia: createPinia(),
  render: h => h(App)
}).$mount('#app')
