import {getToken} from "@/utils/token";
import {userInfo,logout} from "@/api/article";

const state = {
  token: getToken(),
  roles:[]
};
const getters = {
  token: state => state.token,
  roles: state => state.roles
};
const mutations = {
  SET_ROLES: (state,roles) => {
    state.roles = roles;
  },
  SET_TOKEN: (state,token) => {
    state.token = token;
  }
};
const actions = {
  // 获取用户信息
  USERINFO({commit,state}){
    return new Promise((resolve,reject) => {
      userInfo(state.token).then(response => {
        const{data} = response.data;
        commit("SET_ROLES",data.roles);
        console.log(response)
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  退出登录，退出需要清除vuex中的信息
  LOGINOUT({commit,state}){
    return new Promise((resolve,reject) => {
      logout(state.token).then(response => {
        if(response.data.code === 20000){
          commit("SET_ROLES",[]);
          commit("SET_TOKEN","");
        }
        resolve(response);  
      }).catch(error =>{
        reject(error);
      })
    })
  }
};

export default{
  state,
  getters,
  mutations,
  actions
}