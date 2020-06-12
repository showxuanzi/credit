import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/common.css'; // 公共样式
import * as filters from "./filters/index"; //* 表示所有的，filters是别名
import animated from "animate.css";

 
// axios封装在utils/request.js
// import axios from "axios";

// axios.defaults.baseURL = "http://139.196.42.209:5004/api/";
// Vue.prototype.$http = axios;

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
