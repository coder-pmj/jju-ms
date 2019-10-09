<template>
  <div class="navbar">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b"
    >
     
      <el-menu-item index="/auditing">
        <i class="el-icon-upload"></i>
        <span slot="title">最新审核</span>
      </el-menu-item>

      <el-submenu index="list">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userlist">用户列表</el-menu-item>
          <el-menu-item index="/studentlist">在校生列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="setting">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item  @click="$router.push('/login')">
            <span style="color:cyan">退出系统</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #545c64;
}
</style>