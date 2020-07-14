<template>
  <div>
    <h1>作业列表</h1>
    <ul>
      <li v-for="(h, index) in homeworks" :key="index">
        {{ h.title }}
        <button type="button" @click="toEditTest(h.id)">编辑</button>
        <button type="button" @click="toCheckTest(h.id)">批改</button>
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
    this.homeworks = res.data.tests;
    this.cid = res.data.cid;
  },
  methods: {
    toEditTest(hid) {
      this.$router.push(
        "/teacher/courses/" +
          this.cid +
          "/tests/" +
          this.hid +
          "/addTestQuestion"
      );
    },
    toCheckTest(hid) {
      this.$router.push(
        "/teacher/courses/" + this.cid + "/tests/" + this.hid + "/testQuestion"
      );
    }
  }
};
</script>
