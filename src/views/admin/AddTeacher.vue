<template>
  <div>
    <el-form :model="submitForm" class="sumbit" :rules="rules">
      <h1>添加教师信息</h1>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="submitForm.name"></el-input>
      </el-form-item>

      <el-form-item label="工号" prop="number">
        <el-input v-model="submitForm.number"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="submitForm.password"></el-input>
      </el-form-item>
      <el-form-item label="需要选择学生数" prop="selectStudentNum">
        <el-input v-model="submitForm.selectStudentNum"></el-input>
      </el-form-item>
      <el-form-item label="想要选择学生数" prop="wantStudentNum">
        <el-input v-model="submitForm.wantStudentNum"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit">
        添加
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    async submit() {
      let res = await this.$http.post("/admin/teacher", this.submitForm);
      if (res != null) {
        this.$message.success("添加成功");
        this.centerDialogVisible = false;
        this.$router.go(0);
      }
    }
  },
  data() {
    return {
      submitForm: {
        id: null,
        name: null,
        password: null,
        number: null,
        selectStudentNum: null,
        wantStudentNum: null
      },
      rules: {
        name: [{ required: true, message: "不可为空", trigger: "blur" }],
        numberL: [{ required: true, message: "不可为空", trigger: "blur" }],
        password: [{ required: true, message: "不可为空", trigger: "blur" }],
        selectStudentNum: [
          { required: true, message: "不可为空", trigger: "blur" }
        ],
        wantStudentNum: [
          { required: true, message: "不可为空", trigger: "blur" }
        ]
      }
    };
  }
};
</script>
