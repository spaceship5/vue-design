<template>
  <div>
    <h1>{{ resource.name }}</h1>
    <p>时间：{{ resource.updateTime }}</p>
    <p>{{ resource.type }}</p>
    <p>{{ resource.content }}</p>
  </div>
</template>
<script>
export default {
  props: ["rid", "cid"],
  data: () => ({
    resource: null
  }),
  async created() {
    let res = await this.$http.get(
      "/student/course/" + this.cid + "/resource/" + this.rid
    );
    console.log(res);
    this.resource = res.data.resource;
  }
};
</script>
<style scoped></style>
