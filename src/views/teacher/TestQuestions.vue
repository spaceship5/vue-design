<template>
  <div>
    <el-form
      :v-model="subForm"
      :rules="rules"
      v-for="(s, index) in students"
      :key="index"
    >
      {{ s.user.name }}

      <p>{{ tq.title }} / {{ tq.answerTestQuestion.answer }}</p>
      <label>
        得分:
        <input type="text" v-model="subForm.grade" />
      </label>
    </el-form>
    <el-form-item>
      <el-button type="submit" @click="submit">确认</el-button>
    </el-form-item>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["cid", "hid"],
  students: [],
  subForm: {
    id: null,
    grade: []
  },
  rules: {
    grade: [{ required: true, message: "不可为空", trigger: "blur" }]
  },
  async created() {
    let res = await this.$http.get("/teacher/course/{cid}/students");
    console.log(res);
    this.students = res.data.students;
  },
  methods: {
    async submit() {
      let res = await this.$http.post("student/answerGrades", this.subForm);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("已批改完成！");
      }
    }
  }
};
</script>
