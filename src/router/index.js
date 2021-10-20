import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import Account from '@/components/Account'
import Search from '@/components/Search'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/account/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
  ]
})

