<template>
    <div>
      <el-button type="text" @click="goback">退出</el-button>
    </div>
</template>
<script>
import {logout} from "@/api/article";
import {reomveToken} from "@/utils/token";
export default {
  name: "layout-header",
  methods:{
    goback(){
      console.log("tuichu");
      logout()
      .then(res => {
        if(res.data.code === 20000){
          reomveToken();
          this.$router.push("/login");
        }
      })
    }
  }
}
</script>
<style>
</style>