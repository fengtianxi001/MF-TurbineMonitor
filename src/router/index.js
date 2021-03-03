/*
 * @description: 
 * @author: 肛肠科冯主任
 * @Date: 2020-08-27 16:36:56
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import{ mapActions } from 'vuex'
//自动导入
const contexts = require.context('../views', false, /\.vue$/);
let moudels = []
contexts.keys().forEach(key => {
  const cache = key.replace(/^\.\//, '').replace(/\.vue$/, '')
  if (cache != 'Home') {
    moudels.push({
      path: `/${cache}`,
      name: `${cache}`,
      component: r => require([`../views/${cache}`], r)
    })
  }
})


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...moudels
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
NProgress.inc(0.2)
NProgress.configure({easing: 'ease', speed: 500, showSpinner: false })

//用路由守卫来做nav显示
router.beforeEach((to, from, next) => {
  NProgress.start()
  store.dispatch('setBarTitle', to.name)
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
