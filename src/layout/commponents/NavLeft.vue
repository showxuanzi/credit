<template>
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
          <el-submenu index="/loan-approve">
            <template slot="title">贷款审批</template>
            <el-menu-item index="/loan-approve/first">初审</el-menu-item>
            <el-menu-item index="/loan-approve/end">终审</el-menu-item>
          </el-submenu>
      </el-menu>
  </el-aside>
</template>
<style>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
</style>