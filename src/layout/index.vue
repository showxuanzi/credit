<template>
    <el-container>
        <el-aside width="200px">
        <!-- 引入进来需要加上router方能使用路由控制切换 -->
            <el-menu router
                default-active="/index"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#1989fa">
                <el-menu-item index="/index">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/loan-input">
                    <i class="el-icon-document"></i>
                    <span slot="title">贷款申请</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    /*line-height: 320px;*/
  }
</style>