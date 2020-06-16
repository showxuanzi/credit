import Vue from 'vue';
import Vuex from 'vuex';
import user from "./modules/user";
import permission from "./modules/permission";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{  //多个模 块
      user,
      permission
  }
});

export default store