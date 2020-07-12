<template>
  <div @scroll.passive="getScroll($event)">
    <header>
      <h1>{{ resource.name }}</h1>
      <span>
        完成状态:
        <el-tag>{{ learnedResource != null ? "已完成" : "未完成" }}</el-tag>
      </span>
    </header>

    <p>时间：{{ resource.updateTime }}</p>
    <p>{{ resource.type }}</p>
    <p>{{ resource.content }}</p>
    <el-button
      type="primary"
      @click="addLearnedResource"
      v-if="learnedResource == null"
    >
      我已经完成学习
    </el-button>
  </div>
</template>
<script>
export default {
  props: ["rid", "cid"],
  data: () => ({
    resource: null,
    learnedResource: null
  }),
  async created() {
    let res = await this.$http.get(
      "/student/course/" + this.cid + "/resource/" + this.rid
    );
    console.log(res);
    this.resource = res.data.resource;
    if (res.data.learnedResource != null)
      this.learnedResource = res.data.learnedResource;
  },
  methods: {
    async addLearnedResource() {
      let res = await this.$http.post("/student/learnedResource", {
        rid: this.rid
      });
      console.log(res);
      if (res != null) {
        this.$message.success("学习完成");
        this.$router.go(0);
      }
    }
  }
};
</script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
}
</style>
