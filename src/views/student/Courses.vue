<template>
  <div>
    <h1>请输入需要查询的课程</h1>
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="findName"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="find"
        ></el-button>
      </el-input>
    </div>
    <h1>课程列表</h1>
    <el-row>
      <el-col
        :span="10"
        v-for="(c, index) in showCourses"
        :key="index"
        :offset="1"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <span>{{ c.name }}</span>
            <div class="bottom clearfix">
              <p>{{ c.detail }}</p>
              <time class="time">{{ c.updateTime }}</time>
              <el-button type="text" class="button" @click="toCourse(c.id)">
                课程详情
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      courses: [],
      showCourses: [],
      findName: null
    };
  },
  methods: {
    find() {
      let newCourses = [];
      this.courses.forEach(element => {
        if (element.name == this.findName) {
          newCourses.push(element);
        }
      });
      this.showCourses = newCourses;
      console.log(this.showCourses);
    },
    toCourse(cid) {
      this.$router.push("/student/course/" + cid);
    }
  },
  async created() {
    let res = await this.$http.get("/student/courses");
    console.log(res);
    this.courses = res.data.courses;
    this.showCourses = this.courses;
  }
};
</script>
