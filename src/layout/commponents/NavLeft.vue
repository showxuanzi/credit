<template>
  <el-aside width="200px">
  <!-- 引入进来需要加上router方能使用路由控制切换 -->
      <el-menu router
          :default-active="$route.path" 
          class="el-menu-vertical-demo">
          <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/loan-input">
              <i class="el-icon-document"></i>
              <span slot="title">贷款申请</span>
          </el-menu-item>
          <el-menu-item index="/input-manager">
              <i class="el-icon-document"></i>
              <span slot="title">申请管理</span>
          </el-menu-item>
          <el-submenu index="/loan-approve">
            <template slot="title">
              <i class="el-icon-menu"></i>
              贷款审批
            </template>
            <el-menu-item index="/loan-approve/first">初审</el-menu-item>
            <el-menu-item index="/loan-approve/end">终审</el-menu-item>
          </el-submenu>
          <el-menu-item index="/contract-manager">
              <i class="el-icon-document"></i>
              <span slot="title">标的管理</span>
          </el-menu-item>
          <el-submenu index="/permission">
            <template slot="title">
              <i class="el-icon-menu"></i>
              权限管理
            </template>
            <el-menu-item index="/permission/create">创建人员</el-menu-item>
            <el-menu-item index="/permission/list">列表展示</el-menu-item>
          </el-submenu>
      </el-menu>
  </el-aside>
</template>
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