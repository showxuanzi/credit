import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/home',
    name: "home",
    redirect: "/index",
    component: () => import("../layout/index"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/home/index")
      },
      {
        path: "/loan-input",
        name: "loan-input",
        component: () => import("../views/loan-input/index")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
