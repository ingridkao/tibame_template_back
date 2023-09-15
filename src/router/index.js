import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { 
      title:'首頁'
    }
  },
  {
    path: '/store',
    name: 'store',
    // route level code-splitting
    // this generates a separate chunk (store.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "store" */ '../views/StoreView.vue'),
    meta: { 
      title:'商品管理',
      requiresAuth: true 
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})


router.beforeEach(async(to, from) => {
  // ❗️檢查用户是否已登录並避免無限重定向
  if(to.meta.requiresAuth && to.name !== 'login'){
    const isAuth = await store.dispatch('checkUseLogin')
    if(isAuth){
      return true
    }else{
      return '/login'
    }
  }
})
export default router
