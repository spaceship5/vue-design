<template>
  <el-form>
    <h1>作业列表</h1>
    <ol type="1">
      <li v-for="(h, index) in homeworks" :key="index">
        {{ h.title }}
        <el-button type="success" @click="toHomeWork(h.id)">答题</el-button>
      </li>
    </ol>
    <router-view />
  </el-form>
</template>
<script>
export default {
  props: ["cid"],
  data() {
    return {
      homeworks: []
    };
  },
  async created() {
    let res = await this.$http.get("/student/course/" + this.cid + "/tests");
    console.log(res);
    this.homeworks = res.data.tests;
  },
  methods: {
    toHomeWork(tid) {
      this.$router.push(
        "/student/course/" + this.cid + "/tests/" + tid + "/test"
      );
    }
  }
};
</script>
