import Vue from 'vue'
import VueRouter from 'vue-router'

import loanApprove from "./modules/loanApprove";
import permission from "./modules/permission";

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 常规路由
export const normalRoutes = [
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
    meta:{title: "首页"},
    redirect: "/index",
    component: () => import("../layout/index"),
    children:[
      {
        path: "/index", //首页
        name: "index",
        meta:{title: "首页",roles:["input","approve"]},
        component: () => import("../views/home/index")
      }
    ]
  }
];
export const asyncRoutes = [
  {
    path: "/index", //首页
    name: "index",
    meta:{title: "首页",roles:["input","approve"]},
    component: () => import("../views/home/index")
  },
  {
    path: "/loan-input",//贷款申请
    name: "loan-input",
    meta:{title: "贷款申请",roles:["input"]},
    component: () => import("../views/loan-input/index")
  },
  {
    path: "/input-manager",//申请管理
    name: "input-manager",
    meta:{title: "申请管理",roles:["input"]},
    component: () => import("../views/input-manager/index")
  },
  loanApprove,
  {
    path: "/contract-manager",//标的管理
    name: "contract-manager",
    meta:{title: "标的管理",roles:["approve"]},
    component: () => import("../views/contract-manager/index")
  },
  permission
]

const router = new VueRouter({
  // linkActiveClass:"is-active",
  mode: 'history',
  base: process.env.BASE_URL,
  routes: normalRoutes
})

export default router
