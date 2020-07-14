<template>
  <div>
    <h1>作业列表</h1>
    <ul>
      <li v-for="(h, index) in homeworks" :key="index">
        {{ h.title }}
        <button type="button" @click="toHomework(h.id)">答题</button>
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
    this.homeworks = res.data.tests;
  },
  methods: {
    toHomeWork(hid) {
      this.$router.push(
        "/student/course/" + this.cid + "/tests/" + hid + "/test"
      );
    }
  }
};
</script>
