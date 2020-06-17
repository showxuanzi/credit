<template>
    <div class="clearfix">
      <div class="head-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(v,i) in matched" :key="i" :to="v.path">{{v.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="head-menu">
        <el-dropdown>
          <span class="el-dropdown-link">
            退出<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="goback($event)">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>
<script>
// import {logout} from "@/api/article";
import {getToken,reomveToken} from "@/utils/token";
export default {
  name: "layout-header",
  data(){
    return{
      matched: [],
      roles:[]
    }
  },
  watch: {
    $route(){
      this.getBreadcrumb();
    }
  },
  created(){
    this.getBreadcrumb();
  },
  methods:{
    goback(e){
      let token = getToken();
      console.log(e.target)
      console.log("tuichu")
      if(token){
        // 退出并清除vuex中的信息
        this.$store.dispatch("LOGINOUT").then(res => {
          if(res.data.code === 20000){
            reomveToken();
            this.$router.push("/login");
          }
        });
      }else{
        reomveToken();
        this.$router.push("/login");
      }
    },
     getBreadcrumb() {
      //  当点击首页的时候只显示“首页”
      if(this.$route.path === "/index"){
        this.matched = [];
        this.matched[0] = this.$route;
      }else{
        // 非首页的时候全部显示
        this.matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      }
    }
  }
}
</script>
<style lang="scss">
.head-breadcrumb{
  float: left;
  .el-breadcrumb{
    height: 56px;
    line-height: 56px;
  }
  .el-breadcrumb__inner.is-link{
    color: #fff;
    cursor: pointer;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    color: #bedbed;
  }
  .el-breadcrumb__inner:hover{
    color: #bedbed;
  }
}
.head-menu{
  float: right;
  cursor: pointer;
  .el-dropdown{
    color:#fff;
  }
}
</style>