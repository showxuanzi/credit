<template>
  <el-aside width="200px">
  <!-- 引入进来需要加上router方能使用路由控制切换 -->
      <el-menu router
          :default-active="$route.path" 
          class="el-menu-vertical-demo">
          <NavItem v-for="route in get_routes[0].children" :key="route.path"
          :item="route" :base-path="route.path" />
      </el-menu>
  </el-aside>
</template>
<script>
import {mapGetters} from "vuex";
import NavItem from "./NavItem";
export default {  
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters(["get_routes"])
  },
  components:{
    NavItem
  }
}
</script>
<style lang="scss">
  .el-aside {
    background-color: #222848;
    line-height: 200px;
    .el-menu{
      background-color: #222848;
      text-align: left;
      border-right: none;
      .el-menu-item{
        color: #bedbed;
        i{
          color: #bedbed;
        }
      }
      .el-menu-item:focus, .el-menu-item:hover,.el-submenu__title:hover,.el-menu-item.is-active{
        background-color: #0085fe;
        color: #fff;
      }
      .el-submenu__title{
        color: #bedbed;
        i{
          color: #bedbed;
        }
      }
    }
  }
</style>