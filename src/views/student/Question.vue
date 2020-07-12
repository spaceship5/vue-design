<template>
  <div>
    <h1>{{ question.title }}</h1>
    <p>{{ question.detail }}</p>
    <el-input
      type="textarea"
      placeholder="请输入您的回答"
      v-model="answerQuestion"
      class="input-with-select"
    ></el-input>
    <p v-if="!this.sub">已提交，不可重复提交</p>
    <el-button slot="append" @click="subAns" v-if="this.sub">
      提交
    </el-button>
  </div>
</template>
<script>
export default {
  props: ["qid", "cid"],
  data: () => ({
    question: null,
    answerQuestion: null,
    sub: true
  }),
  async created() {
    let res = await this.$http.get(
      "/student/course/" + this.cid + "/question/" + this.qid
    );
    console.log(res);
    this.question = res.data.question;
    this.answerQuestion = res.data.answerQuestion.answer;
    this.sub = false;
  },
  methods: {
    async subAns() {
      let res = await this.$http.post("/student/answerQuestion", {
        answer: this.answerQuestion,
        qid: this.qid
      });
      if (res != null) {
        this.$message.success("回答成功");
        this.$router.go(0);
      }
    }
  }
};
</script>
<style scoped></style>
