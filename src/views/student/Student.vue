<template>
  <el-container>
    <el-header>
      <div style="margin:10px">
        <span>同学您好，欢迎您使用系统</span>
      </div>
      <el-button type="info" plain @click="logout" class="logoutBtn">
        退出
      </el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#0090f0"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <router-link to="/student/mycourse">
            <el-menu-item index="1">
              <i class="el-icon-location"></i>
              我的课程
            </el-menu-item>
          </router-link>
          <router-link to="/student/courses">
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">选修课程</span>
            </el-menu-item>
          </router-link>

          <router-link to="/student/setting">
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">账号管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/type.js";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
      this.$store.commit(LOGIN, false);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {}
};
</script>
<style scope>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: #409eff;
  border-radius: 3px;
}
.logoutBtn {
  margin: 13px;
}
.el-aside {
  background-color: #0090f0;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: 100%;
}
a {
  text-decoration: none;
}
</style>
