import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const constantRoutes =  {
  routes: [
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
      component: () => import('@/views/login/index.vue')
    },
    // {
    //   path: '/component',
    //   name: 'Component',
    //   children: [
    //     {
    //       path: 'calendar',
    //       component: () => import('@/views/component/calendar'),
    //       name: 'Calendar',
    //       meta: { title: 'calendar', icon: '', noCache: true, affix: true }
    //     }
    //   ]
    // }
  ]
}

const router = new Router({
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 }) // 切换路由时滚动到页面顶部
})

export default router
