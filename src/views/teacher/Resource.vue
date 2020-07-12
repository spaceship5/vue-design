<template>
  <div>
    <el-button type="danger" @click="deleteResource">删除内容</el-button>
    <el-form :model="subForm" class="sumbit" :rules="rules">
      <h1>修改内容</h1>
      <el-form-item label="内容名" prop="name">
        <el-input v-model="subForm.name"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="type">
        <el-input v-model="subForm.type"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="subForm.content"></el-input>
      </el-form-item>

      <el-form-item label="url" prop="url">
        <el-input v-model="subForm.url"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitResource">
        修改内容
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["cid", "rid"],
  data: () => ({
    questionDialogVisible: false,
    resourceDialogVisible: false,
    course: null,
    activeName: "first",
    defaultProps: {
      children: "children",
      label: "label"
    },
    subForm: {
      id: null,
      name: null,
      content: null,
      type: null,
      url: null
    },
    rules: {
      name: [{ required: true, message: "不可为空", trigger: "blur" }],
      content: [{ required: true, message: "不可为空", trigger: "blur" }],
      type: [{ required: true, message: "不可为空", trigger: "blur" }],
      url: [{ required: true, message: "不可为空", trigger: "blur" }]
    }
  }),
  async created() {
    let res = await this.$http.get(
      "/student/course/" + this.cid + "/resource/" + this.rid
    );
    this.subForm.id = res.data.resource.id;
    this.subForm.name = res.data.resource.name;
    this.subForm.content = res.data.resource.content;
    this.subForm.url = res.data.resource.url;
    this.subForm.type = res.data.resource.type;
  },
  computed: {},
  methods: {
    addResource() {
      this.resourceDialogVisible = true;
    },
    addQuestion() {
      this.questionDialogVisible = true;
    },
    async submitResource() {
      let res = await this.$http.patch("/teacher/resource", this.subForm);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("修改成功");
      }
    },
    async deleteResource() {
      let res = await this.$http.delete("/teacher/resource/" + this.rid);
      if (res != null) {
        this.$message.success("删除成功");
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style scoped></style>
