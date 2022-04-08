// Vue Router 4.x 是一组函数
import { createRouter, createWebHashHistory } from 'vue-router'

// layout
import Layout from '@/layout/index.vue'

const routes =  [
  {
    path: '/',
    name: '登录',
    component: () => import('@/views/login/index.vue'),
    hidden: true, // 不显示在右侧菜单栏
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
    path: '/component',
    name: '组件',
    component: Layout,
    children: [
      {
        path: 'table',
        name: '表格',
        meta: { title: 'table', icon: '', noCache: true, affix: true },
        component: () => import('@/views/components/table/index.vue'),
      },
      {
        path: 'tree',
        name: '树',
        meta: { title: 'tree', icon: '', noCache: true, affix: true },
        component: () => import('@/views/components/tree/index.vue'),
      },
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }) // 切换路由时滚动到页面顶部
})

export default router
