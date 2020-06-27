<template>
  <div>
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
      <el-table-column label="需要选择学生数" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ scope.row.selectStudentNum }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="想要选择学生数" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ scope.row.wantStudentNum }}
          </span>
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
        <el-form-item label="需要选择学生数" prop="selectStudentNum">
          <el-input v-model="updateForm.selectStudentNum"></el-input>
        </el-form-item>
        <el-form-item label="想要选择学生数" prop="wantStudentNum">
          <el-input v-model="updateForm.wantStudentNum"></el-input>
        </el-form-item>
        <el-button type="primary" @click="update">
          更新课程
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
      this.updateForm.selectStudentNum = row.selectStudentNum;
      this.updateForm.wantStudentNum = row.wantStudentNum;
    },
    async handleDelete(index, row) {
      let res = await this.$http.delete("/admin/teacher/" + row.id);
      console.log(res);
      if (res.data == true) {
        this.$message.success("删除成功");
        this.$router.go(0);
      }
    },
    async update() {
      let res = await this.$http.patch("/admin/teacher", this.updateForm);
      if (res != null) {
        this.$message.success("修改成功");
        this.centerDialogVisible = false;
        this.$router.go(0);
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
