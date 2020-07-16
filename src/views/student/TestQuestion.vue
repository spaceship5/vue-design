<template>
  <div>
    {{ test.title }}
    <el-form
      :v-model="subForm"
      :rules="rules"
      v-for="(q, index) in testQuestions"
      :key="index"
    >
      <div v-if="q.type == 1">
        <el-form-item>
          <li>
            <h2>{{ q.title }}</h2>
            <h2>{{ q.detail }}</h2>
          </li>
        </el-form-item>
        <ol type="A">
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
          <h2>{{ q.title }}</h2>
          <h2>{{ q.detail }}</h2>
          <input type="text" :v-model="subForm.answer" />
        </el-form-item>
      </div>
      <div v-if="q.type == 3">
        <el-form-item>
          <h2>{{ q.title }}</h2>
          <h2>{{ q.detail }}</h2>
        </el-form-item>
        <el-form-item>
          <label>
            <input type="checkbox" :v-model="subForm.answer" value="1" />
            √
          </label>
        </el-form-item>
        <el-form-item>
          <label>
            <input type="checkbox" :v-model="subForm.answer" value="0" />
            ×
          </label>
        </el-form-item>
      </div>
      <div v-if="q.type == 4">
        <el-form-item>
          <h2>{{ q.title }}</h2>
          <h2>{{ q.detail }}</h2>
        </el-form-item>
        <el-form-item>
          <input type="text" row="30" col="30" :v-model="subForm.answer" />
        </el-form-item>
      </div>
      <el-button type="submit" @click="submit">提交</el-button>
      <hr />
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["cid", "tid"],
  data() {
    return {
      test: null,
      testQuestions: [],
      subForm: {
        id: null,
        answer: null
      },
      rules: {
        answer: [{ required: true, message: "不可为空", trigger: "blur" }]
      }
    };
  },
  async created() {
    let res = await this.$http.get(
      "/student/tests/" + this.tid + "/testQuestions"
    );
    let res1 = await this.$http.get("/student/tests/" + this.tid + "/test");
    console.log(res);
    this.testQuestions = res.data.testQuestions;
    this.test = res1.data.test;
  },
  methods: {
    async submit() {
      this.subForm.id = this.q.id;
      let res = await this.$http.post(
        "/student/answerTestQuestion",
        this.subForm
      );
    }
  }
};
</script>
