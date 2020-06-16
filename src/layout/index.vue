<template>
    <el-container>
      <!-- 左侧导航 -->
        <NavLeft />
        <el-container>
          <!-- 头部 -->
          <el-header>
            <Header />
          </el-header>
            <!-- 中间内容 -->
            <Main />
            <!-- 底部 -->
            <Footer />
        </el-container>
    </el-container>
</template>
<script>
// import NavLeft from "./commponents/NavLeft";
// import Header from "./commponents/Header";
// import Main from "./commponents/Main";
// import Footer from "./commponents/Footer";
import {NavLeft,Header,Main,Footer} from "./commponents";
export default {
  name: "layout",
  components: {
    NavLeft,
    Header,
    Main,
    Footer
  }
}
</script>
<style>
  .el-container{
    height: 100%;
  }
  .el-header {
    background-color: #222848;
    color: #bedbed;
    line-height: 56px;
    height: 60px;
    padding: 0 10px;
  }

</style>