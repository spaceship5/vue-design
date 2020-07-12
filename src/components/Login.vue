<template>
  <div class="login_container">
    <div class="login_box">
      <h1 class="h">欢迎使用该系统！</h1>
      <el-form
        ref="loginFormRef"
        label-width="90px"
        :model="user"
        :rules="rules"
      >
        <el-form-item label="登陆/注册" prop="radio">
          <el-radio v-model="user.radio" label="1">登录</el-radio>
          <el-radio v-model="user.radio" label="2">注册</el-radio>
        </el-form-item>
        <template v-if="user.radio == 1">
          <el-form-item label="学号/工号" prop="username">
            <el-input v-model.number="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </template>
        <template v-if="user.radio == 2">
          <el-form-item label="学号/工号" prop="username">
            <el-input v-model.number="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" v-if="user.radio == 2" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="姓名" v-if="user.radio == 2" prop="name">
            <el-input v-model="user.name" type="name"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="role">
            <el-radio v-model="user.role" label="1">学生</el-radio>
            <el-radio v-model="user.role" label="2">教师</el-radio>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="register">注册</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>
<script>
import { LOGIN } from "@/store/type.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        radio: "1",
        name: "",
        role: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入学号/工号", trigger: "blur" },
          { type: "number", message: "学号/工号必须为数字值", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        radio: [{ required: true, message: "请选择身份", trigger: "change" }],
        role: [{ required: true, message: "请选择身份", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;

        this.$store.dispatch(LOGIN, {
          username: this.user.username,
          password: this.user.password
        });
      });
      setTimeout(() => {
        if (this.isLogin == true) {
          this.$message.success("登陆成功");
          if (window.sessionStorage.getItem("role") == "534bcf636cf6cb0cf6") {
            this.$router.push("/student");
          } else if (
            window.sessionStorage.getItem("role") == "4bcbb36cf4cf63bc4b"
          ) {
            this.$router.push("/teacher");
          } else {
            this.$router.push("/admin");
          }
        }
      }, 500);
    },
    async register() {
      let resp = await this.$http.post("register", this.user);
      if (resp != null) {
        this.$message.success("注册成功，请登录");
      }
    }
  }
};
</script>
<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  padding: 20px;
  width: 450px;

  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.h {
  text-align: center;
}
</style>
