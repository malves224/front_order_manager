import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/order'
  },
  {
    path: '/order',
    component: () => import('../views/OrderView'),
    children: [
      { path: '', component: () => import('../views/OrderBalcony') },
      { path: 'list', component: () => import('../views/OrderList') },
      { path: 'detail/:id', component: () => import('../views/OrderProgress') },
    ]
  },
  {
    path: '/cart',
    component: () => import('../views/CartView'),
    children: [
      { path: '', component: () => import('../views/ShowItems') }
    ]
  },
  {
    path: '/gestor',
    name: 'Gestor',
    component: () => import('../views/GestorView')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
