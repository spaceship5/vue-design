<template>
  <div>
    <header>
      <h1>我的课程</h1>
      <el-button type="success" @click="addCourse">添加课程</el-button>
    </header>

    <el-row>
      <el-col :span="10" v-for="(c, index) in courses" :key="index" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <span>{{ c.name }}</span>
            <div class="bottom clearfix">
              <p>{{ c.detail }}</p>
              <time class="time">{{ c.updateTime }}</time>
              <p></p>
              <el-button type="primary" class="button" @click="toCourse(c.id)">
                课程详情
              </el-button>
              <el-button type="primary" class="button" @click="updateCourse(c)">
                修改基本信息
              </el-button>
              <el-button
                type="danger"
                class="button"
                @click="deleteCourse(c.id)"
              >
                删除
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="添加课程"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form :model="subForm" class="sumbit" :rules="rules">
        <h1>添加课程</h1>
        <el-form-item label="课程名" prop="name">
          <el-input v-model="subForm.name"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="detail">
          <el-input v-model="subForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="内容成绩占比" prop="resourcePercentage">
          <el-input v-model="subForm.resourcePercentage"></el-input>
        </el-form-item>

        <el-form-item label="问答成绩占比" prop="questionPercentage">
          <el-input v-model="subForm.questionPercentage"></el-input>
        </el-form-item>
        <el-form-item label="作业成绩占比" prop="homeworkPercentage">
          <el-input v-model="subForm.homeworkPercentage"></el-input>
        </el-form-item>
        <el-form-item label="测试成绩占比" prop="testPercentage">
          <el-input v-model="subForm.testPercentage"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">
          添加课程
        </el-button>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改课程"
      :visible.sync="updateDialogVisible"
      width="30%"
      center
    >
      <el-form :model="subForm" class="sumbit" :rules="rules">
        <h1>修改课程</h1>
        <el-form-item label="课程名" prop="name">
          <el-input v-model="subForm.name"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="detail">
          <el-input v-model="subForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="内容成绩占比" prop="resourcePercentage">
          <el-input v-model="subForm.resourcePercentage"></el-input>
        </el-form-item>

        <el-form-item label="问答成绩占比" prop="questionPercentage">
          <el-input v-model="subForm.questionPercentage"></el-input>
        </el-form-item>
        <el-form-item label="作业成绩占比" prop="homeworkPercentage">
          <el-input v-model="subForm.homeworkPercentage"></el-input>
        </el-form-item>
        <el-form-item label="测试成绩占比" prop="testPercentage">
          <el-input v-model="subForm.testPercentage"></el-input>
        </el-form-item>
        <el-button type="primary" @click="update">
          修改课程
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
header {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
export default {
  data() {
    return {
      courses: [],
      subForm: {
        id: null,
        name: null,
        detail: null,
        resourcePercentage: null,
        questionPercentage: null,
        testPercentage: null,
        homeworkPercentage: null
      },
      centerDialogVisible: false,
      updateDialogVisible: false,
      rules: {
        name: [{ required: true, message: "不可为空", trigger: "blur" }],
        detail: [{ required: true, message: "不可为空", trigger: "blur" }],
        resourcePercentage: [
          { required: true, message: "不可为空", trigger: "blur" }
        ],
        questionPercentage: [
          { required: true, message: "不可为空", trigger: "blur" }
        ],
        testPercentage: [
          { required: true, message: "不可为空", trigger: "blur" }
        ],
        homeworkPercentage: [
          { required: true, message: "不可为空", trigger: "blur" }
        ]
      }
    };
  },
  async created() {
    let res = await this.$http.get("/teacher/courses");
    console.log(res);
    this.courses = res.data.courses;
    console.log(res.data);
  },
  methods: {
    toCourse(cid) {
      this.$router.push("/teacher/courses/" + cid);
    },
    addCourse() {
      this.centerDialogVisible = true;
    },
    async submit() {
      let res = await this.$http.post("/teacher/course", this.subForm);
      console.log(res);
      if (res.data != null) {
        this.$router.go(0);
        this.$message.success("添加成功");
      }
    },
    async update() {
      let res = await this.$http.patch("/teacher/course", this.subForm);
      console.log(res);
      if (res.data != null) {
        this.$router.go(0);
        this.$message.success("修改成功");
      }
    },
    updateCourse(course) {
      this.subForm.id = course.id;
      this.subForm.name = course.name;
      this.subForm.detail = course.detail;
      this.subForm.resourcePercentage = course.resourcePercentage;
      this.subForm.questionPercentage = course.questionPercentage;
      this.subForm.testPercentage = course.testPercentage;
      this.subForm.homeworkPercentage = course.homeworkPercentage;
      this.updateDialogVisible = true;
    },
    async deleteCourse(cid) {
      let res = await this.$http.delete("/teacher/course/" + cid);
      if (res.data.success == true) {
        this.$router.go(0);
        this.$message.success("删除成功");
      }
    }
  }
};
</script>
