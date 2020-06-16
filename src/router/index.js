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
    meta:{title: "首页"},
    redirect: "/index",
    component: () => import("../layout/index"),
    children: [
      {
        path: "/index", //首页
        name: "index",
        meta:{title: "首页"},
        component: () => import("../views/home/index")
      },
      {
        path: "/loan-input",//贷款申请
        name: "loan-input",
        meta:{title: "贷款申请"},
        component: () => import("../views/loan-input/index")
      },
      {
        path: "/input-manager",//申请管理
        name: "input-manager",
        meta:{title: "申请管理"},
        component: () => import("../views/input-manager/index")
      },
      {
        path: "/loan-approve",//贷款审批
        name: "loan-approve",
        meta:{title: "贷款审批"},
        component: () => import("../views/loan-approve/index"),
        children: [
          {
            path: "/loan-approve/first",
            name: "first",
            meta:{title: "初审"},
            component: () => import("../views/loan-approve/first")
          },
          {
            path: "/loan-approve/end",
            name: "end",
            meta:{title: "终审"},
            component: () => import("../views/loan-approve/end")
          }
        ]
      },
      {
        path: "/contract-manager",//标的管理
        name: "contract-manager",
        meta:{title: "标的管理"},
        component: () => import("../views/contract-manager/index")
      },
      {
        path: "/permission",//权限管理
        name: "permission",
        meta:{title: "权限管理"},
        component: () => import("../views/permission/index"),
        children: [
          {
            path: "/permission/create",
            name: "create",
            meta:{title: "创建人员"},
            component: () => import("../views/permission/create")
          },
          {
            path: "/permission/list",
            name: "list",
            meta:{title: "列表展示"},
            component: () => import("../views/permission/list")
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
