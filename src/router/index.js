import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Login from '@/view/login'
import Register from '@/view/register'
import More from '@/view/more'
import TrafficForecast from '@/components/subview_traffic'
import FlowForecast from '@/components/subview_flow'
import ODForecast from '@/components/subview_OD'
Vue.use(Router)

export const constantRouterMap = [
  //默认路由
  {
    path: '/',
    redirect: '/index',
  },
  //全局展示路由
  {
    name: 'index',
    path: '/index',
    component: Index,
  },
  //详细信息页路由
  {
    name: 'more',
    path: '/more',
    component: More,
    redirect: '/trafficForecast',
    children: [{
        name: 'trafficForecast',
        path: '/trafficForecast',
        component: TrafficForecast,
      },
      {
        name: 'flowForecast',
        path: '/flowForecast',
        component: FlowForecast,
      },
      {
        name: 'ODForecast',
        path: '/ODForecast',
        component: ODForecast,
      },
    ],
  },
  //登录路由
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  //注册路由
  {
    name: 'register',
    path: '/register',
    component: Register,
  },
]

const router = new Router({
  routes: constantRouterMap,
})

export default router