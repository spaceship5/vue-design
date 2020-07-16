<template>
  <div>
    <h1>考试列表</h1>
    <ul>
      <li v-for="(t, index) in tests" :key="index">
        {{ t.title }}
        <button type="button" @click="toTest(t.id)">进入考试</button>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script>
export default {
  props: ["cid"],
  async created() {
    let res = await this.$http.get("/student/course/" + this.cid + "/tests");
    console.log(res);
    this.tests = res.data.tests;
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
