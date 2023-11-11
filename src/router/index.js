import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Cart from '@/views/layout/cart'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import User from '@/views/layout/user'

import store from '@/store'

const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Login = () => import('@/views/login')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/cart', component: Cart },
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/user', component: User }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/prodetail/:id',
    component: ProDetail
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/myorder',
    component: MyOrder
  }
]

const router = new VueRouter({
  routes
})

const authUrl = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  const token = store.getters.token
  console.log('路由拦截', to.path, 'token:', token)
  if (authUrl.indexOf(to.path) !== -1 && !token) {
    next('/login')
  }
  next()
})

export default router
