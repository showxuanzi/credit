const tokenKey = "admin-token";
export function setToken(token){
    return sessionStorage.setItem(tokenKey,token);
}
export function getToken(){
    return sessionStorage.getItem(tokenKey);
}
export function reomveToken(){
    return sessionStorage.removeItem(tokenKey);
}