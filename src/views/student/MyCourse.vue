<template>
  <div>
    <h1>我的课程</h1>
    <el-row>
      <el-col :span="10" v-for="(c, index) in courses" :key="index" :offset="1">
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
      courses: []
    };
  },
  async created() {
    let res = await this.$http.get("/student/coursesBySid");
    console.log(res);
    this.courses = res.data.courses;
  },
  methods: {
    toCourse(cid) {
      this.$router.push("/student/course/" + cid);
    }
  }
};
</script>
