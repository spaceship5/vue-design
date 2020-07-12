<template>
  <div>
    <header>
      <h1>课程名：{{ course.name }}</h1>
    </header>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="内容" name="first">
        <header>
          <span>添加内容</span>
          <el-button type="primary" @click="addResource">添加</el-button>
        </header>
        <el-tree
          :data="resourceName"
          :props="defaultProps"
          @node-click="toResource"
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane label="问答" name="second">
        <header>
          <span>添加问答</span>
          <el-button type="primary" @click="addQuestion">添加</el-button>
        </header>
        <el-tree
          :data="questionName"
          :props="defaultProps"
          @node-click="toQuestion"
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane label="作业" name="third">作业</el-tab-pane>
      <el-tab-pane label="试卷" name="fourth">试卷</el-tab-pane>
    </el-tabs>
    <el-dialog
      title="添加内容"
      :visible.sync="resourceDialogVisible"
      width="30%"
      center
    >
      <el-form :model="subForm" class="sumbit" :rules="rules">
        <h1>添加内容</h1>
        <el-form-item label="内容名" prop="name">
          <el-input v-model="subForm.name"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-input v-model="subForm.type"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="subForm.content"></el-input>
        </el-form-item>

        <el-form-item label="url" prop="url">
          <el-input v-model="subForm.url"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitResource">
          添加内容
        </el-button>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加问答"
      :visible.sync="questionDialogVisible"
      width="30%"
      center
    >
      <el-form :model="subForm" class="sumbit" :rules="rules">
        <h1>添加问答</h1>
        <el-form-item label="问题标题" prop="title">
          <el-input v-model="subForm.title"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="detail">
          <el-input v-model="subForm.detail"></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitQuestion">
          添加问答
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["cid"],
  data: () => ({
    questionDialogVisible: false,
    resourceDialogVisible: false,
    course: null,
    activeName: "first",
    elective: "null",
    resource: [
      { id: 1, name: "list" },
      { id: 2, name: "map" },
      { id: 3, name: "set" }
    ],
    defaultProps: {
      children: "children",
      label: "label"
    },
    questions: [
      { id: 1, name: "list" },
      { id: 2, name: "map" },
      { id: 3, name: "set" }
    ],
    subForm: {
      id: null,
      title: null,
      name: null,
      content: null,
      detail: null,
      type: null,
      url: null
    },
    rules: {
      name: [{ required: true, message: "不可为空", trigger: "blur" }],
      title: [{ required: true, message: "不可为空", trigger: "blur" }],
      content: [{ required: true, message: "不可为空", trigger: "blur" }],
      type: [{ required: true, message: "不可为空", trigger: "blur" }],
      detail: [{ required: true, message: "不可为空", trigger: "blur" }],
      url: [{ required: true, message: "不可为空", trigger: "blur" }]
    }
  }),
  async created() {
    let res = await this.$http.get("/student/course/" + this.cid);
    console.log(res);
    this.course = res.data.course;
    this.resource = res.data.resources;
    this.questions = res.data.questions;
  },
  computed: {
    resourceName: function() {
      let resourceName = [];
      this.resource.forEach(e => {
        resourceName.push({
          label: e.name,
          id: e.id
        });
      });
      return resourceName;
    },
    questionName: function() {
      let resourceName = [];
      this.questions.forEach(e => {
        resourceName.push({
          label: e.title,
          id: e.id
        });
      });
      return resourceName;
    }
  },
  methods: {
    toResource(data) {
      this.$router.push("/teacher/course/" + this.cid + "/resource/" + data.id);
    },
    toQuestion(data) {
      this.$router.push("/teacher/course/" + this.cid + "/question/" + data.id);
    },
    handleClick() {},
    addResource() {
      this.resourceDialogVisible = true;
    },
    addQuestion() {
      this.questionDialogVisible = true;
    },
    async submitQuestion() {
      this.subForm.id = this.cid;
      let res = await this.$http.post("/teacher/question", this.subForm);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("添加成功");
      }
    },
    async submitResource() {
      this.subForm.id = this.cid;
      let res = await this.$http.post("/teacher/resource", this.subForm);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("添加成功");
      }
    }
  }
};
</script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
}
</style>
