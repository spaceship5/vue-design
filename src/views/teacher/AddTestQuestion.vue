<template>
  <div>
    <!-- <el-dialog
      title="添加作业"
      :visible.sync="testDialogVisible"
      width="30%"
      center
    > -->
    <el-form :model="subForm" class="sumbit" :rules="rules">
      <h1>添加题目</h1>
      <!-- <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
      <el-form-item label="题型">
        <select v-model="subForm.types" @change="select($event)">
          <option value="1">选择题</option>
          <option value="2">填空题</option>
          <option value="3">判断题</option>
          <option value="4">问答题</option>
        </select>
      </el-form-item>

      <template v-if="subForm.types == 1">
        <el-form-item label="题目描述" prop="detail">
          <el-input v-model="subForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="正确选项" prop="current">
          <el-input v-model="subForm.current"></el-input>
        </el-form-item>
        <el-form-item label="错误选项" prop="error1">
          <el-input v-model="subForm.error1"></el-input>
        </el-form-item>
        <el-form-item label="错误选项" prop="error2">
          <el-input v-model="subForm.error2"></el-input>
        </el-form-item>
        <el-form-item label="错误选项" prop="error3">
          <el-input v-model="subForm.error3"></el-input>
        </el-form-item>
      </template>

      <template v-if="subForm.types == 2">
        <el-form-item label="题目描述" prop="detail">
          <el-input v-model="subForm.detail"></el-input>
        </el-form-item>
      </template>
      <template v-if="subForm.types == 3">
        <el-form-item label="题目描述" prop="detail">
          <el-input v-model="subForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="正确答案" prop="current">
          <el-input
            v-model="subForm.current"
            placeholder="请输入1或0"
          ></el-input>
        </el-form-item>
      </template>

      <template v-if="subForm.types == 4">
        <el-form-item label="题目描述" prop="content">
          <el-input v-model="subForm.content"></el-input>
        </el-form-item>
      </template>
      <el-button type="primary" @click="submitTestQuestion">
        添加
      </el-button>
    </el-form>
    <!-- <el-tree
          :data="testName"
          :props="defaultProps"
          @node-click="toHomework"
        ></el-tree> -->
    <!-- </el-dialog>   -->
  </div>
</template>
<script>
export default {
  props: ["tid", "cid"],
  data: () => ({
    // options: [
    //   {
    //     value: 1,
    //     label: "选择题"
    //   },
    //   {
    //     value: 2,
    //     label: "填空题"
    //   },
    //   {
    //     value: 3,
    //     label: "判断题"
    //   },
    //   {
    //     value: 4,
    //     label: "问答题"
    //   }
    // ],
    subForm: {
      id: null,
      isTest: null,
      title: null,
      detail: null,
      current: null,
      error1: null,
      error2: null,
      error3: null,
      types: 1
    },
    rules: {
      isTest: [{ required: true, message: "不可为空", trigger: "blur" }],

      title: [{ required: true, message: "不可为空", trigger: "blur" }],

      types: [{ required: true, message: "不可为空", trigger: "blur" }],
      detail: [{ required: true, message: "不可为空", trigger: "blur" }],
      current: [{ required: true, message: "不可为空", trigger: "blur" }],
      error1: [{ required: true, message: "不可为空", trigger: "blur" }],
      error2: [{ required: true, message: "不可为空", trigger: "blur" }],
      error3: [{ required: true, message: "不可为空", trigger: "blur" }]
    }
  }),
  methods: {
    change(event) {
      this.subForm.types = event.target.value;
    },
    handleClick() {},
    async submitTestQuestion() {
      let res = await this.$http.post(
        "/teacher/tests/" + this.tid + "/test/testQuestion",
        this.subForm
      );
      console.log(res);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("添加成功");
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
