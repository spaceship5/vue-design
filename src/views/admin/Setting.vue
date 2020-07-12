<template>
  <el-form :model="submitForm" class="sumbit" :rules="rules">
    <h1>账号设置修改</h1>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="submitForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="submitForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="工号" prop="number">
      <el-input v-model="submitForm.number"></el-input>
    </el-form-item>

    <p>注：除密码外，其他默认值为原账号设置属性</p>
    <el-button type="primary" @click="submit">
      修改
    </el-button>
  </el-form>
</template>
<style></style>

<script>
export default {
  methods: {
    async submit() {
      let res = await this.$http.patch("/admin/user", this.submitForm);
      if (res != null) {
        this.$message.success("修改成功,跳转至登录,重新登录");
        window.sessionStorage.clear();
        this.$router.push("/login");
      }
    }
  },
  data() {
    return {
      submitForm: {
        name: null,
        password: null,

        number: null
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        selectStudentNum: [
          { required: true, message: "请输入想要学生数", trigger: "blur" }
        ],
        wantStudentNum: [
          { required: true, message: "请输入可选择学生数", trigger: "blur" }
        ],
        number: [
          { required: true, message: "请输入可选择学生数", trigger: "blur" }
        ]
      }
    };
  },
  async created() {
    let res = await this.$http.get("/admin/user");
    console.log(res);
    this.submitForm.name = res.data.user.name;
    this.submitForm.number = res.data.user.number;
  }
};
</script>
