import Vue from 'vue'
import VueRouter from 'vue-router'
import Reports from '../views/reports/Index.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Index.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/products/Index.vue')
  }
  ,
  {
    path: '/employees',
    name: 'Employees',
    component: () => import(/* webpackChunkName: "employees" */ '../views/employee/Index.vue')
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import(/* webpackChunkName: "invoices" */ '../views/invoices/Index.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
]

const router = new VueRouter({
  routes
})

export default router
