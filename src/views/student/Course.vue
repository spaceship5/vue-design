<template>
  <div>
    <header>
      <h1>课程名：{{ course.name }}</h1>
      <el-button v-if="elective == null" type="success" @click="AddElective">
        选课
      </el-button>
    </header>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="内容" name="first">
        <el-tree
          :data="resourceName"
          :props="defaultProps"
          @node-click="toResource"
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane label="问答" name="second">
        <el-tree
          :data="questionName"
          :props="defaultProps"
          @node-click="toQuestion"
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane label="作业" name="third">作业</el-tab-pane>
      <el-tab-pane label="试卷" name="fourth">试卷</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: ["cid"],
  data: () => ({
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
    ]
  }),
  async created() {
    let res = await this.$http.get("/student/course/" + this.cid);
    console.log(res);
    this.course = res.data.course;
    this.elective = res.data.elective;
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
      this.$router.push("/student/course/" + this.cid + "/resource/" + data.id);
    },
    toQuestion(data) {
      this.$router.push("/student/course/" + this.cid + "/question/" + data.id);
    },
    async AddElective() {
      let res = await this.$http.post("/student/elective", {
        cid: this.course.id
      });
      if (res.data.success == true) {
        this.$router.go(0);
        this.$message.success("选择成功");
      }
    },
    handleClick() {}
  }
};
</script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
}
</style>
