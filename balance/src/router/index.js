import Vue from 'vue'
import Router from 'vue-router'
// 组件
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MemberCenter from '@/components/member/MemberCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/memberCenter',
      name: '用户中心',
      component: MemberCenter
    }
  ]
})
