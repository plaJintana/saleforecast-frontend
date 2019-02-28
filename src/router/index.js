import Vue from 'vue'
import Router from 'vue-router'
import userLogin from '@/components/authentication/login'
import adminLogin from '@/components/index/admin/adminLogin'
import index from '@/components/index/index'
import admin from '@/components/index/admin/admin'
import presale from '@/components/index/presale/presale'
import sale from '@/components/index/sale/sale'
import business from '@/components/index/business/business'
import viewDetailSale from '@/components/index/admin/manage/sale/viewDetails/viewDetailSale'
import viewDetailReport from '@/components/index/sale/viewDetailReport/viewDetailReport'
import viewDetailReportSale from '@/components/index/presale/viewDetailReport/viewDetailReport'
import editBusiness from '@/components/index/business/editBusiness/editBusiness'
import reportPresale from '@/components/index/presale/reportPresale/reportPresale'
import { Decode } from '@/services'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: userLogin, meta: { userAuth: true } },
    { path: '/adminLogin', component: adminLogin, meta: { userAuth: true } },
    { path: '/account/:id', component: index, meta: { requiresAuth: true } },
    { path: '/admin/:id', component: admin, meta: { requiresAuthAdmin: true } },
    { path: '/presale/:id', component: presale, meta: { presaleAuth: true } },
    { path: '/sale/:id', component: sale, meta: { saleAuth: true } },
    { path: '/business/:id', component: business, meta: { businessAuth: true } },
    { path: '/viewDetailSale', component: viewDetailSale, meta: { requiresAuthAdmin: true } },
    { path: '/viewDetailReport', component: viewDetailReport, meta: {requiresAuth: true} },
    { path: '/viewDetailReportPresale', component: viewDetailReportSale, meta: {requiresAuth: true} },
    { path: '/editBusiness', component: editBusiness, meta: {requiresAuth: true} },
    { path: '/reportPresale', component: reportPresale, meta: {requiresAuth: true} },
    // { path: '/account', redirect: '/account/request', meta: { requiresAuth: true } },
    // { path: '/account/home/:id', component: home, meta: { requiresAuth: true } },
    { path: '*', redirect: '/login' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.requiresAuthAdmin)) {
    if (window.$cookies.isKey('usertype')) {
      if (Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '') !== 'admin') {
        next({ path: '/account' })
      } else {
        next()
      }
    } else {
      next({ path: '/login' })
    }
    return
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.requiresAuth)) {
    if (!window.$cookies.isKey('information')) {
      next({ path: '/login' })
    } else {
      next()
    }
    return
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.userAuth)) {
    if (window.$cookies.isKey('usertype')) {
      if (Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '') === 'PRESALE') {
        next({ path: '/presale/request' })
      } else if (Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '') === 'SALE') {
        next({ path: '/sale/request' })
      } else if (Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '') === 'BUSINESS') {
        next({ path: '/business/remark' })
      } else if (Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '') === 'admin') {
        next({ path: '/admin/manageUser' })
      }
    } else {
      next()
    }
    return
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.presaleAuth)) {
    if (window.$cookies.isKey('usertype')) {
      if (Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '') === 'PRESALE') {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.saleAuth)) {
    if (window.$cookies.isKey('usertype')) {
      if (Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '') === 'SALE') {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((x) => x.meta.businessAuth)) {
    if (window.$cookies.isKey('usertype')) {
      if (Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '') === 'BUSINESS') {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
  next()
})
export default router
