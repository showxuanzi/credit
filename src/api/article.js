import request from "@/utils/request.js";

// 登录
export function login(data){
    return request({
        method: "post",
        url: "user/login",
        data
    })
    // return request.post("user/login",data);
}

// 退出
export function logout(){
    return request({
        method: "post",
        url: "user/logout"
    })
}