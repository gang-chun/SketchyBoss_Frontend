import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import Account from '@/components/Account'
import Search from '@/components/Search'
import Forgot from "@/components/Forgot";
import ReportList from "@/components/ReportList";
import ReportCreate from "@/components/ReportCreate";
import ReportEdit from "@/components/ReportEdit";
import CompanyReports from "@/components/CompanyReports";
import Register from "@/components/Register";
import ActorCreate from "../components/ActorCreate";
import CompanyCreate from "../components/CompanyCreate";
import ActorEdit from "../components/ActorEdit";
import CompanyEdit from "../components/CompanyEdit";

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
      path: '/report-edit/:pk',
      name: 'ReportEdit',
      component: ReportEdit
    },
    {
      path: '/actor-create',
      name: 'ActorCreate',
      component: ActorCreate
    },
    {
      path: '/actor-edit/:pk',
      name: 'ActorEdit',
      component: ActorEdit
    },
    {
      path: '/company-create',
      name: 'CompanyCreate',
      component: CompanyCreate
    },
    {
      path: '/company-edit/:pk',
      name: 'CompanyEdit',
      component: CompanyEdit
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
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})




