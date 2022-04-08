import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

// 消除重复点击相同路由的控制台报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const constantRoutes = [
  {
    path: '/',
    name: '登录',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    name: '首页',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '首页',
        meta: { title: 'home', icon: '', noCache: true, affix: true },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/home2',
    name: 'aaa',
    component: Layout,
    children: [
      {
        path: 'index1',
        name: 'bbb',
        meta: { title: 'home', icon: '', noCache: true, affix: true },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'index2',
        name: 'ccc',
        meta: { title: 'home', icon: '', noCache: true, affix: true },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
]

const router = new Router({
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 }) // 切换路由时滚动到页面顶部
})

export default router
