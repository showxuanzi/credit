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

// 申请管理-删除
export function loanDelete(data){
    return request({
        method: "delete",
        url: "loan/delete/"+data.id
    })
}


// 申请管理-编辑
export function loanUpdate(data){
    return request({
        method: "put",
        url: "loan/update",
        data
    })
}

// 贷款审批-初审-查询（列表）
export function approveFirstList(data){
    return request({
        method: "get",
        url: "approve/first/list",
        params: data
    })
}

// 贷款审批-初审-查看详情  &  贷款审批-终审-查看详情 
export function loanQuery(data){
    return request({
        method: "get",
        url: "loan/query",
        params: data
    })
}

// 贷款审批-初审-通过
export function approveFirstPass(data){
    return request({
        method: "post",
        url: "approve/first/pass",
        data
    })
}

// 贷款审批-初审-拒绝
export function approveFirstReject(data){
    return request({
        method: "post",
        url: "approve/first/reject",
        data
    })
}

// 贷款审批-终审-查询（列表）
export function approveEndList(data){
    return request({
        method: "get",
        url: "approve/end/list",
        params: data
    })
}

// 贷款审批-终审-通过
export function approveEndPass(data){
    return request({
        method: "post",
        url: "approve/end/pass",
        data
    })
}

// 贷款审批-终审-拒绝
export function approveEndReject(data){
    return request({
        method: "post",
        url: "approve/end/reject",
        data
    })
}

// 标的管理-查询（列表）
export function contractList(data){
    return request({
        method: "get",
        url: "contract/list",
        params: data
    })
}

// 标的管理-生成合同
export function contractCreate(data){
    return request({
        method: "post",
        url: "contract/createFile",
        data
    })
}
// 标的管理-下载合同
export function contractDownload(data){
    return request({
        method: "get",
        url: "contract/download",
        params: data
    })
}

// 权限管理-创建人员
export function createUser(data){
    return request({
        method: "post",
        url: "permission/createUser",
        data
    })
}

// 权限管理-列表展示
export function userList(data){
    return request({
        method: "get",
        url: "user/list",
        params: data
    })
}