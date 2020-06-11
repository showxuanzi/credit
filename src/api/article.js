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

// 贷款申请
export function loanCreate(data){
    return request({
        method: "post",
        url: "loan/create",
        data
    })
}

// 申请管理列表
export function loanList(data){
    return request({
        method: "get",
        url: "loan/list",
        params: data
    })
}

// 提交申请
export function loanSubmit(data){
    return request({
        method: "post",
        url: "loan/submitToApprove",
        data
    })
}