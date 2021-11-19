import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import Account from '@/components/Account'
import Search from '@/components/Search'
import SearchPage from '@/components/SearchPage'
import Forgot from "@/components/Forgot";
import ReportList from "@/components/ReportList";
import ReportCreate from "@/components/ReportCreate";

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
      path: '/report-list',
      name: 'ReportList',
      component: ReportList
    },
    {
      path: '/report-list/:msg',
      name: 'ReportUpdatedList',
      component: ReportList
    },
    {
      path: '/report-create',
      name: 'ReportCreate',
      component: ReportCreate
    },
    {
      path: '/report-create/:pk',
      name: 'ReportUpdate',
      component: ReportCreate
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
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
    {
      path: '/auth/forgot',
      name: 'Forgot',
      component: Forgot
    },
  ]
})

