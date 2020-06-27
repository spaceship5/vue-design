<template>
  <div>
    <el-form :model="submitForm" class="sumbit" :rules="rules">
      <h1>添加课程</h1>
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="submitForm.name"></el-input>
      </el-form-item>
      <el-form-item label="权值" prop="value">
        <el-input v-model="submitForm.value"></el-input>
      </el-form-item>
      <el-form-item label="最低分" prop="minGrade">
        <el-input v-model="submitForm.minGrade"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit">
        添加课程
      </el-button>
    </el-form>
    <h1>课程列表</h1>
    <el-table :data="courses" style="width: 100%">
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>更新时间: {{ scope.row.updateTime }}</p>
            <p>插入时间: {{ scope.row.updateTime }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                size="medium"
                @click="courseElective(scope.$index, scope.row)"
              >
                {{ scope.row.name }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="权值" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低分" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.minGrade }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handle(scope.$index, scope.row)"
          >
            导入学生成绩
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleUpdate(scope.$index, scope.row)"
          >
            导入文件上传
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
      title="修改课程"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form :model="updateForm" class="sumbit" :rules="rules">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权值" prop="value">
          <el-input v-model="updateForm.value"></el-input>
        </el-form-item>
        <el-form-item label="最低分" prop="minGrade">
          <el-input v-model="updateForm.minGrade"></el-input>
        </el-form-item>
        <el-button type="primary" @click="update">
          更新课程
        </el-button>
      </el-form>
    </el-dialog>
    <el-dialog
      title="导入学生成绩"
      :visible.sync="impDialogVisible"
      width="30%"
      center
    >
      <el-form :model="impForm" class="sumbit" :rules="rules">
        <el-form-item label="学生学号">
          <el-input v-model="impForm.number"></el-input>
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="impForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="impForm.detail"></el-input>
        </el-form-item>
        <el-button type="primary" @click="imp">
          导入成绩
        </el-button>
      </el-form>
    </el-dialog>
    <el-dialog
      title="通过文件导入成绩"
      :visible.sync="updateDialogVisible"
      width="30%"
      center
    >
      <form>
        <input type="file" @change="read" />
        <el-button type="primary" @click="up">上传</el-button>
      </form>
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
import xlsx from "xlsx";

export default {
  methods: {
    read(event) {
      let file = event.target.files[0];
      let students = [];
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = event => {
        let data = event.target.result;
        let workbook = xlsx.read(data, { type: "binary" });
        let sheet = workbook.Sheets[workbook.SheetNames[0]];
        xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
          let number = parseInt(r.__EMPTY);
          if (!isNaN(number)) {
            let stu = {
              number: r.__EMPTY,
              name: r.__EMPTY_1,
              grade: r.__EMPTY_9,
              cid: this.updateByxlsxCid
            };
            students.push(stu);
          }
        });
      };
      console.log(students);
      this.students = students;
    },
    async up() {
      let res;

      res = await this.$http.post("/teacher/courseElectiveByXlsx", {
        students: this.students
      });
      if (res != null) {
        this.$message.success("导入成功");
        this.$router.go(0);
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.updateForm.id = row.id;
      this.updateForm.name = row.name;
      this.updateForm.value = row.value;
      this.updateForm.minGrade = row.minGrade;
    },
    handle(index, row) {
      console.log(index, row);
      this.impDialogVisible = true;
      this.impForm.cId = row.id;
    },
    handleUpdate(index, row) {
      console.log(index, row);
      this.updateDialogVisible = true;
      this.updateByxlsxCid = row.id;
    },
    async handleDelete(index, row) {
      let res = await this.$http.delete("/teacher/course/" + row.id);
      console.log(res);
      if (res.data == true) {
        this.$message.success("删除成功");
        this.$router.go(0);
      }
    },
    async submit() {
      let res = await this.$http.post("/teacher/course", this.submitForm);
      if (res != null) {
        this.$message.success("添加成功");
        this.$router.go(0);
      }
    },
    async update() {
      let res = await this.$http.patch("/teacher/course", this.updateForm);
      if (res != null) {
        this.$message.success("修改成功");
        this.centerDialogVisible = false;
        this.$router.go(0);
      }
    },
    async imp() {
      let res = await this.$http.post("/teacher/courseElective", this.impForm);
      if (res != null) {
        this.$message.success("修改成功");
        this.centerDialogVisible = false;
        this.$router.go(0);
      }
    },
    courseElective(index, row) {
      this.$router.push("/courseElective/" + row.id);
    }
  },
  data() {
    return {
      updateDialogVisible: false,
      impDialogVisible: false,
      centerDialogVisible: false,
      courses: [],
      students: [],
      updateByxlsxCid: null,
      submitForm: {
        name: null,
        value: null,
        minGrade: null
      },
      updateForm: {
        id: null,
        name: null,
        value: null,
        minGrade: null
      },
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        value: [
          { required: true, message: "请输入权值", trigger: "blur" },
          { type: "number", message: "权值必须为数字值", trigger: "blur" }
        ],
        minGrade: [
          { required: true, message: "请输入最低分", trigger: "blur" },
          { type: "number", message: "最低分必须为数字值", trigger: "blur" }
        ]
      },
      impForm: {
        cId: null,
        number: null,
        grade: null,
        detail: ""
      }
    };
  },
  async created() {
    let res = await this.$http.get("/teacher/courses");
    console.log(res);
    this.courses = res.data.courses;
  }
};
</script>
