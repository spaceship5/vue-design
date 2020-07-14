<template>
  <div>
    <h1>试卷列表</h1>
    <ul>
      <li v-for="(t, index) in tests" :key="index">
        {{ t.title }}
        <button type="button" @click="toTest(t.id)">答题</button>
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
    let res = await this.$http.get("/student/course/{cid}/tests");
    console.log(res);
    this.tests = res.data.tests;
    this.cid = res.data.cid;
  },
  methods: {
    toTest(hid) {
      this.$router.push(
        "/student/course/" + this.cid + "/tests/" + hid + "/test"
      );
    }
  }
};
</script>
