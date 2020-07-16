<template>
  <div>
    <el-form>
      <h1>作业列表</h1>
      <ol type="1">
        <el-form-item>
          <li v-for="(h, index) in homeworks" :key="index">
            {{ h.title }}
            <el-button type="button" @click="toTest(h.id)">
              浏览
            </el-button>
            <router-view />
            <el-button type="success" @click="toEditTest(h.id)">编辑</el-button>
            <el-button type="button" @click="toCheckTest(h.id)">批改</el-button>
          </li>
        </el-form-item>
      </ol>
    </el-form>
  </div>
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
    let res = await this.$http.get("/teacher/course/" + this.cid + "/tests");
    console.log(res);
    this.homeworks = res.data.tests;
  },
  methods: {
    toTest(tid) {
      this.$router.push(
        "/student/course/" + this.cid + "/tests/" + tid + "/test"
      );
    },
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
