<template>
  <div>
    <el-form :model="submitForm" class="sumbit" :rules="rules">
      <h1>预先选择学生</h1>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="submitForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="number">
        <el-input v-model="submitForm.number"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit">
        选择
      </el-button>
    </el-form>
    <h1>已互选学生</h1>
    <el-table :data="students" style="width: 100%">
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>更新时间: {{ scope.row.updateTime }}</p>
            <p>插入时间: {{ scope.row.insertTime }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.user.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="学号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.user.number }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style></style>

<script>
export default {
  methods: {
    async submit() {
      let res = await this.$http.post("/teacher/preStudent", this.submitForm);
      if (res != null) {
        this.$message.success("选择成功");
        this.$router.go(0);
      }
    }
  },
  data() {
    return {
      submitForm: {
        name: null,
        number: null
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        number: [{ required: true, message: "请输入学号", trigger: "blur" }]
      },
      students: [],
      courses: []
    };
  },
  async created() {
    let res = await this.$http.get("/teacher/selectStudents");
    console.log(res);
    this.students = res.data.students;
  }
};
</script>
