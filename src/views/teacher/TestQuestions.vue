<template>
  <div>
    {{ test.title }}
    <el-form
      :v-model="subForm"
      :rules="rules"
      v-for="(s, index) in students"
      :key="index"
    >
      {{ s.user.name }}
      <div id="a">
        <span v-for="(tq, index) in test" :key="index">
          <br />
          {{ tq.type }}
          <br />
          {{ tq.detail }}
          <br />
          {{ tq.current }}
          <br />
        </span>
      </div>
      <div id="b">
        <span v-for="(an, index) in answerTestQuestions" :key="index">
          {{ an.anwer }}
        </span>
      </div>

      <label>
        得分:
        <input type="text" v-model="subForm.grade" />
      </label>
      <el-form-item>
        <el-button type="submit" @click="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["cid", "tid"],
  students: [],
  answerTestQuestions: [],
  test: null,
  subForm: {
    id: null,
    grade: null
  },
  rules: {
    grade: [{ required: true, message: "不可为空", trigger: "blur" }]
  },
  async created() {
    let res = await this.$http.get("/teacher/course/" + this.cid + "/students");
    let res1 = await this.$http.get("/teacher/tests/" + this.tid + "/test");
    let res2 = await this.$http.get(
      "/student/tests/" + this.tid + "/test/answerTestQuestion"
    );
    console.log(res);
    this.students = res.data.students;
    this.test = res1.data.test;
    this.answerTestQuestions = res2.data.answerTestQuestions;
  },
  methods: {
    async submit() {
      let res = await this.$http.post("student/answerGrade", this.subForm);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("");
      }
    }
  }
};
</script>
