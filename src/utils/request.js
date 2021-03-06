import axios from "axios";
import {getToken} from "@/utils/token";
import {Message} from "element-ui";

// 配置环境变量以后可以直接使用
// axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.baseURL = "http://139.196.42.209:5004/api/";

// 请求拦截器
axios.interceptors.request.use(function(config){
    // 在发送请求前
    // 判断，当时非登录的接口时，添加token
    config.headers["token"] = getToken(); //token放在头部发送给后端
    return config;
},function(error){
    // 请求错误
    return Promise.reject(error);
});


// 响应拦截器
axios.interceptors.response.use(function(response){
    // 响应数据
    if(getToken() !== null && response.url !== "user/info"){
        if(response.data.code !== 20000){
            if(response.data.code === 10001){
                Message({
                    message: 'token不存在或已过期，请重新登录！',
                    type: 'error',
                    duration: 2000
                });
            }else{
                Message({
                message: '错误代码：'+ response.data.message,
                type: 'error',
                duration: 2000
            });
                    }
        }
    }
    return response;
},function(error){
    // 响应数据错误
    Message({
        message: '错误代码：'+ error.message,
        type: 'error',
        duration: 2000
    });
    return Promise.reject(error);

});

export default axios; //直接返回axios