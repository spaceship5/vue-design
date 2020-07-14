<template>
  <div>
    <h1>作业列表</h1>
    <ul>
      <li v-for="(t, index) in tests" :key="index">
        {{ t.title }}
        <button type="button" @click="toEditTest(t.id)">编辑</button>
        <button type="button" @click="toCheckTest(t.id)">批改</button>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  porps: ["cid"],
  async created() {
    let res = await this.$http.get("/teacher/courses/{cid}/tests");
    console.log(res);
    this.tests = res.data.tests;
    this.cid = res.data.cid;
  },
  methods: {
    toEditTest(tid) {
      this.$router.push(
        "/teacher/courses/" + this.cid + "/tests/" + tid + "/addTestQuestion"
      );
    },
    toCheckTest(tid) {
      this.$router.push(
        "/teacher/courses/" + this.cid + "/tests/" + tid + "/testQuestion"
      );
    }
  }
};
</script>
