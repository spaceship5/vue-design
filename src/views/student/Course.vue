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
      <el-tab-pane label="作业" name="third">
        <el-button type="button" class="button" @click="toHomeWorkList">
          作业
        </el-button>
      </el-tab-pane>
      <!-- <el-tree
        :data="homeworkName"
        :props="defaultProps"
        @node-click="toHomeWorkList"
      ></el-tree> -->
      <el-tab-pane label="考试" name="fourth">
        <el-button type="button" class="button" @click="toTestList">
          考试列表
        </el-button>
      </el-tab-pane>
      <!-- <el-tree
        :data="testName"
        :props="defaultProps"
        @node-click="toTestList"
      ></el-tree> -->
      <el-tab-pane label="学习情况统计" name="fifth" v-if="elective != null">
        <h1>学习情况统计</h1>
        <div>
          内容：{{ numberLearnedResource }}/ {{ resource.length }}
          <p></p>
          <el-progress
            type="circle"
            :percentage="parseInt(this.resourcePer)"
          ></el-progress>
        </div>
        <div>
          问答：{{ numberAnswerQuestion }}/ {{ questions.length }}
          <p></p>
          <el-progress
            type="circle"
            :percentage="
              parseInt(
                ((this.numberAnswerQuestion * 1.0) / this.questions.length) *
                  1.0 *
                  100
              )
            "
          ></el-progress>
        </div>
        <div>作业：</div>
        <div>测试：</div>
        <div>成绩：</div>
      </el-tab-pane>
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
    resource: [],
    tests: [],
    defaultProps: {
      children: "children",
      label: "label"
    },
    questions: [],

    numberLearnedResource: 0,
    numberAnswerQuestion: 0
  }),
  async created() {
    let res = await this.$http.get("/student/course/" + this.cid);
    console.log(res);
    this.course = res.data.course;
    this.elective = res.data.elective;
    this.resource = res.data.resources;
    this.questions = res.data.questions;
    this.tests = res.data.tests;
    this.numberAnswerQuestion = res.data.numberAnswerQuestion;
    this.numberLearnedResource = res.data.numberLearnedResource;
  },
  computed: {
    resourcePer: function() {
      console.log(
        ((this.numberLearnedResource * 1.0) / this.resource.length) * 1.0
      );
      return (
        ((this.numberLearnedResource * 1.0) / this.resource.length) * 1.0 * 100
      );
    },
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
    },
    homeworkName: function() {
      let homeworkName = [];
      this.questions.forEach(e => {
        homeworkName.push({
          label: e.title,
          id: e.id
        });
      });
      return homeworkName;
    },
    testName: function() {
      let testName = [];
      this.questions.forEach(e => {
        testName.push({
          label: e.title,
          id: e.id
        });
      });
      return testName;
    }
  },
  methods: {
    toHomeWorkList(data) {
      this.$router.push("/student/course/" + this.cid + "/homeWorkList");
    },
    toTestList(data) {
      this.$router.push("/student/course/" + this.cid + "/testList");
    },
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
