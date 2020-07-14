<template>
  <div v-if="homework">
    <el-form
      :v-model="subForm"
      :rules="rules"
      v-for="(q, index) in homework"
      :key="index"
    >
      <div v-if="q.type == 1">
        <ol type="A">
          <el-form-item>
            <li>{{ q.title }}</li>
          </el-form-item>
          <el-form-item>
            <label>
              <input type="checkbox" :v-model="subForm.answer" />
              <li>{{ q.current }}</li>
            </label>
          </el-form-item>
          <el-form-item>
            <label>
              <input type="checkbox" :v-model="subForm.answer" />
              <li>{{ q.error1 }}</li>
            </label>
          </el-form-item>
          <el-form-item>
            <label>
              <input type="checkbox" :v-model="subForm.answer" />
              <li>{{ q.error2 }}</li>
            </label>
          </el-form-item>
          <el-form-item>
            <label>
              <input type="checkbox" :v-model="subForm.answer" />
              <li>{{ q.error3 }}</li>
            </label>
          </el-form-item>
        </ol>
      </div>
      <div v-if="q.type == 2">
        <el-form-item>
          <p>
            {{ q.title }}
            <input type="text" :v-model="subForm.answer" />
          </p>
        </el-form-item>
      </div>
      <div v-if="q.type == 3">
        <el-form-item>
          <p>{{ q.title }}</p>
        </el-form-item>
        <el-form-item>
          <label>
            <input type="checkbox" :v-model="subForm.answer" />
            √
          </label>
        </el-form-item>
        <el-form-item>
          <label>
            <input type="checkbox" :v-model="subForm.answer" />
            ×
          </label>
        </el-form-item>
      </div>
      <div v-if="q.type == 4">
        <el-form-item>
          <p>{{ q.title }}</p>
        </el-form-item>
        <el-form-item>
          <input type="text" row="30" col="30" :v-model="subForm.answer" />
        </el-form-item>
      </div>
      <el-button type="submit" @click="submit">提交</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["cid", "hid"],

  subForm: {
    id: null,
    answer: null
  },
  rules: {
    answer: [{ required: true, message: "不可为空", trigger: "blur" }]
  },
  async created() {
    let res = await this.$http.get("/student/tests/{tid}/test");
    console.log(res);
    this.test = res.data.test;
  },
  methods: {
    async submitHomework() {
      this.subForm.id = this.q.id;
      let res = await this.$http.post("answerTestQuestion", this.subForm);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("提交成功");
      }
    }
  }
};
</script>
