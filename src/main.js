import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/common.css';
// axios封装在utils/request.js
// import axios from "axios";

// axios.defaults.baseURL = "http://139.196.42.209:5004/api/";
// Vue.prototype.$http = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
