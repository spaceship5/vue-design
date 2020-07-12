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
      <el-button type="primary" @click="submit">
        添加
      </el-button>
    </el-form>
    <h1>教师列表</h1>
    <el-table :data="teachers" style="width: 100%">
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教师名称" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>更新时间: {{ scope.row.updateTime }}</p>
            <p>插入时间: {{ scope.row.updateTime }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.user.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="工号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user.number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form :model="updateForm" class="sumbit" :rules="rules">
        <h1>修改教师信息</h1>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>

        <el-form-item label="工号" prop="number">
          <el-input v-model="updateForm.number"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateForm.password"></el-input>
        </el-form-item>

        <el-button type="primary" @click="update">
          更新教师信息
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
export default {
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.updateForm.id = row.id;
      this.updateForm.name = row.user.name;
      this.updateForm.number = row.user.number;
    },
    async handleDelete(index, row) {
      let res = await this.$http.delete("/admin/teacher/" + row.id);
      console.log(res);
      if (res.data.success == true) {
        this.$router.go(0);
        this.$message.success("删除成功");
      }
    },
    async update() {
      let res = await this.$http.patch("/admin/user", this.updateForm);
      if (res != null) {
        this.centerDialogVisible = false;
        this.$router.go(0);
        this.$message.success("修改成功");
      }
    },
    async submit() {
      let res = await this.$http.post("/admin/teacher", this.submitForm);
      if (res != null) {
        this.centerDialogVisible = false;
        this.$router.go(0);
        this.$message.success("添加成功");
      }
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      teachers: [],
      updateForm: {
        id: null,
        name: null,
        password: null,
        number: null
      },
      submitForm: {
        id: null,
        name: null,
        password: null,
        number: null
      },
      rules: {
        name: [{ required: true, message: "不可为空", trigger: "blur" }],
        number: [{ required: true, message: "不可为空", trigger: "blur" }],
        password: [{ required: true, message: "不可为空", trigger: "blur" }]
      }
    };
  },
  async created() {
    let res = await this.$http.get("/admin/teachers");
    console.log(res);
    this.teachers = res.data.teachers;
    console.log(res.data.teachers);
    console.log(this.teachers);
  }
};
</script>
