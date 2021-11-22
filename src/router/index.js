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
import CompanyReports from "@/components/CompanyReports";
import SearchTest from "@/components/SearchTest";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/test',
      name: 'SearchTest',
      component: SearchTest
    },
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
      path: '/company/reports/:pk',
      name: 'CompanyReports',
      component: CompanyReports,

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



