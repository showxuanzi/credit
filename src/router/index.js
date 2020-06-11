import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path: '/', //重定向
    redirect: "/home"
  },
  {
    path: '/login', //登录
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/home', //首页
    name: "home",
    redirect: "/index",
    component: () => import("../layout/index"),
    children: [
      {
        path: "/index", //首页
        name: "index",
        component: () => import("../views/home/index")
      },
      {
        path: "/loan-input",//贷款申请
        name: "loan-input",
        component: () => import("../views/loan-input/index")
      },
      {
        path: "/input-manager",//申请管理
        name: "input-manager",
        component: () => import("../views/input-manager/index")
      },
      {
        path: "/loan-approve",//贷款审批
        name: "loan-approve",
        component: () => import("../views/loan-approve/index"),
        children: [
          {
            path: "/loan-approve/first",
            name: "first",
            component: () => import("../views/loan-approve/first")
          },
          {
            path: "/loan-approve/end",
            name: "first",
            component: () => import("../views/loan-approve/end")
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  // linkActiveClass:"is-active",
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
