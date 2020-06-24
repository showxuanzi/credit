import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/common.css'; // 公共样式
import * as filters from "./filters/index"; //* 表示所有的，filters是别名
import animated from "animate.css";
import "./permission"; //权限文件

 
// axios封装在utils/request.js
// import axios from "axios";

// axios.defaults.baseURL = "http://139.196.42.209:5004/api/";
// Vue.prototype.$http = axios;

// 访问环境变量，process是node中的变量，打包以后会被解析
console.log(process.env.NODE_ENV,process.env.VUE_APP_URL);

Vue.use(ElementUI);
Vue.use(animated);

// 添加全局过滤器
Object.keys(filters).forEach(key =>{
  Vue.filter(key,filters[key])
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
