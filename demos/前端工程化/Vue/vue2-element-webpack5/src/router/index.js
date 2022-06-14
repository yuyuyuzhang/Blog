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
      }
    ],
  },
  {
    path: '/test',
    name: '测试',
    component: Layout,
    children: [
      {
        path: 'dom',
        name: 'Vue 组件 DOM 选项',
        meta: { title: 'dom', icon: '', noCache: true, affix: true },
        component: () => import('@/views/test/dom/index.vue'),
      },
      {
        path: 'data',
        name: 'Vue 组件数据选项',
        meta: { title: 'data', icon: '', noCache: true, affix: true },
        component: () => import('@/views/test/data/index.vue'),
      },
      {
        path: 'life',
        name: 'Vue 组件生命周期选项',
        meta: { title: 'life', icon: '', noCache: true, affix: true },
        component: () => import('@/views/test/life/index.vue'),
      },
      {
        path: 'dynamicComponents',
        name: 'Vue 动态组件',
        meta: { title: 'dynamicComponents', icon: '', noCache: true, affix: true },
        component: () => import('@/views/test/dynamicComponents/index.vue'),
      },
      {
        path: 'asyncComponents',
        name: 'Vue 异步组件',
        meta: { title: 'asyncComponents', icon: '', noCache: true, affix: true },
        component: () => import('@/views/test/asyncComponents/index.vue'),
      }
    ],
  },
  {
    path: '/component',
    name: '组件',
    component: Layout,
    children: [
      {
        path: 'tableTest',
        name: '表格',
        meta: { title: 'tableTest', icon: '', noCache: true, affix: true },
        component: () => import('@/views/components/tableTest/index.vue'),
      },
      {
        path: 'treeTest',
        name: '树',
        meta: { title: 'treeTest', icon: '', noCache: true, affix: true },
        component: () => import('@/views/components/treeTest/index.vue'),
      },
    ]
  },
  {
    path: '/person',
    name: '人员信息',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '人员信息',
        meta: { title: 'person', icon: '', noCache: true, affix: true },
        component: () => import('@/views/person/index.vue'),
      }
    ],
  }
]

const router = new Router({
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 }) // 切换路由时滚动到页面顶部
})

export default router
