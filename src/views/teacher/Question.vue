<template>
  <div>
    <el-button type="danger" @click="deleteResource">删除问题</el-button>
    <el-form :model="subForm" class="sumbit" :rules="rules">
      <h1>修改问题</h1>
      <el-form-item label="内容名" prop="title">
        <el-input v-model="subForm.title"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="detail">
        <el-input v-model="subForm.detail"></el-input>
      </el-form-item>

      <el-button type="primary" @click="submitResource">
        修改内容
      </el-button>
    </el-form>
    <h1>学生回答</h1>
    <el-table :data="answerQuestions" height="250" border style="width: 100%">
      <el-table-column
        prop="student.user.number"
        label="学号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="student.user.name"
        label="学生"
        width="180"
      ></el-table-column>
      <el-table-column prop="answer" label="回答内容"></el-table-column>
      <el-table-column prop="grade" label="回答分数"></el-table-column>
      <el-table-column prop="insertTime" label="回答时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateAns(scope.$index, scope.row)">
            打分
          </el-button>
          <el-button size="mini" @click="deleteAns(scope.$index, scope.row)">
            删除该回答(打回)
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="打分"
      :visible.sync="questionDialogVisible"
      width="30%"
      center
    >
      <el-form :model="updateForm" class="sumbit" :rules="rules">
        <h1>打分</h1>
        <el-form-item label="问题题目">
          <el-input disabled="true" v-model="subForm.title"></el-input>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input disabled="true" v-model="subForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="学生学号">
          <el-input
            disabled="true"
            v-model="updateForm.student.number"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生回答">
          <el-input
            disabled="true"
            v-model="updateForm.answer"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="分数" prop="grade">
          <el-input v-model="updateForm.grade"></el-input>
        </el-form-item>

        <el-button type="primary" @click="update">
          打分
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["cid", "qid"],
  data: () => ({
    questionDialogVisible: false,
    resourceDialogVisible: false,
    course: null,
    activeName: "first",
    defaultProps: {
      children: "children",
      label: "label"
    },
    subForm: {
      id: null,
      title: null,
      detail: null
    },
    rules: {
      title: [{ required: true, message: "不可为空", trigger: "blur" }],
      detail: [{ required: true, message: "不可为空", trigger: "blur" }],
      grade: [{ required: true, message: "不可为空", trigger: "blur" }]
    },
    answerQuestions: [],
    updateForm: {
      id: null,
      student: {
        number: null,
        name: null
      },
      answer: null,
      grade: null
    }
  }),
  async created() {
    let res = await this.$http.get(
      "/student/course/" + this.cid + "/question/" + this.qid
    );
    this.subForm.id = res.data.question.id;
    this.subForm.title = res.data.question.title;
    this.subForm.detail = res.data.question.detail;
    res = await this.$http.get(
      "/teacher/question/" + this.qid + "/answerQuestions"
    );
    this.answerQuestions = res.data.answerQuestions;
    console.log(this.answerQuestions);
  },
  computed: {},
  methods: {
    addResource() {
      this.resourceDialogVisible = true;
    },
    addQuestion() {
      this.questionDialogVisible = true;
    },
    async submitResource() {
      let res = await this.$http.patch("/teacher/question", this.subForm);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("修改成功");
      }
    },
    async deleteResource() {
      let res = await this.$http.delete("/teacher/question/" + this.qid);
      if (res != null) {
        this.$message.success("删除成功");
        this.$router.go(-1);
      }
    },
    updateAns(index, data) {
      this.questionDialogVisible = true;
      this.updateForm.id = data.id;
      this.updateForm.student.number = data.student.user.number;
      this.updateForm.student.name = data.student.user.name;
      this.updateForm.answer = data.answer;
    },
    async update() {
      let res = await this.$http.patch("/teacher/answerQuestion", {
        id: this.updateForm.id,
        grade: this.updateForm.grade
      });
      if (res != null) {
        this.$message.success("打分成功");
        this.$router.go(0);
      }
    },
    async deleteAns(index, data) {
      let res = await this.$http.delete("/teacher/answerQuestion/" + data.id);
      if (res != null) {
        this.$message.success("删除成功");
        this.$router.go(0);
      }
    }
  }
};
</script>
<style scoped></style>
