import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const constantRoutes = [
  // {
  //   path: '/redirect',
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       // component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/',
    name: 'layout',
    // component: () => import('@/views/login/index.vue')
    component: () => import('../views/login/index.vue')
  }
]

const router = new Router({
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 }) // 切换路由时滚动到页面顶部
})

export default router
