<template>
  <div>
    <h1>选课表列表</h1>
    <el-table :data="courseElectives" style="width: 100%">
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.course.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学生名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ scope.row.student.user.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="分数" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.grade }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.detail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            修改学生成绩
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
      <el-form :model="updateForm" class="sumbit">
        <h1>修改成绩</h1>
        <el-form-item label="成绩">
          <el-input v-model="updateForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="updateForm.detail"></el-input>
        </el-form-item>
        <el-button type="primary" @click="update">
          修改
        </el-button>
      </el-form>
    </el-dialog>
    <h1>学生选择方向列表</h1>
    <el-table :data="directionElectives" style="width: 100%">
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.direction.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学生名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ scope.row.student.user.name }}
          </span>
        </template>
      </el-table-column>
    </el-table>
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
  props: ["sid"],
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.updateForm.id = row.id;
      this.updateForm.grade = row.grade;
      this.updateForm.detail = row.detail;
    },
    async handleDelete(index, row) {
      let res = await this.$http.delete("/teacher/courseElective/" + row.id);
      if (res.data == true) {
        this.$message.success("删除成功");
        this.$router.go(0);
      }
    },
    async update() {
      let res = await this.$http.patch(
        "/teacher/courseElective",
        this.updateForm
      );
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
      directionElectives: [],
      courseElectives: [],
      updateForm: {
        id: null,
        grade: null,
        detail: null
      }
    };
  },
  async created() {
    let res = await this.$http.get(
      "/teacher/courseElectiveByStudentId/" + this.sid
    );
    this.courseElectives = res.data;
    res = await this.$http.get(
      "/teacher/directionElectiveByStudentId/" + this.sid
    );
    this.directionElectives = res.data;
  }
};
</script>
