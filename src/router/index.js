import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import Account from '@/components/Account'
import SearchPage from '@/components/SearchPage'


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
      path: '/search/:searchField/:input',
      name: 'SearchPage',
      component: SearchPage,

    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
  ]
})

