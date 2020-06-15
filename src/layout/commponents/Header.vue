<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="text" @click="goback">退出</el-button>
    </div>
</template>
<script>
import {logout} from "@/api/article";
import {getToken,reomveToken} from "@/utils/token";
export default {
  name: "layout-header",
  methods:{
    goback(){
      let token = getToken();
      if(token){
        logout().then(res => {
          if(res.data.code === 20000){
            reomveToken();
            this.$router.push("/login");
          }
        })
      }else{
        reomveToken();
        this.$router.push("/login");
      }
    },
    
  }
}
</script>
<style>
</style>