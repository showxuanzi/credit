import Vue from 'vue';
import Vuex from 'vuex';
import {getToken} from "@/utils/token";
import {userInfo} from "@/api/article";

Vue.use(Vuex)

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
  }
};
const actions = {
  // 获取用户信息
  USERINFO({commit,state}){
    return new Promise((resolve,reject) => {
      userInfo(state.token).then(response => {
        const{data} = response.data;
        commit("SET_ROLES",data.roles);
        resolve(data);
      }).catch(error => {
        reject(error)
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