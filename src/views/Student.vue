<template>
  <el-container class="student-container">
    <el-header>
      <div style="margin:10px">
        <span>{{ user.name }}同学，请填写以下表单</span>
      </div>
      <el-button type="info" plain @click="logout" class="logoutBtn">
        退出
      </el-button>
    </el-header>
    <el-main>
      <el-form :model="selectForm" :rules="rules" label-width="100px">
        <el-form-item label="选择导师">
          <el-select
            v-model="selectForm.teacher"
            placeholder="请选择导师"
            @change="getDirections"
          >
            <el-option
              v-for="t in teacheres"
              :key="t.id"
              :label="t.user.name"
              :value="t.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择方向" prop="direction">
          <el-checkbox-group v-model="selectForm.directions">
            <el-checkbox
              v-for="(d, index) in directionns"
              :key="index"
              :label="d.id"
              name="direction"
            >
              {{ d.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">
            选择
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // teacheres: [],
      // directions: [],
      directionns: [],
      selectForm: {
        teacher: null,
        directions: []
      },
      rules: {
        teacher: [{ required: true, message: "请选择导师", trigger: "blur" }]
      }
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    getDirections() {
      console.log(this.selectForm.teacher);
      this.$store
        .dispatch("directions", { tid: this.selectForm.teacher })
        .then(h => {
          this.directionns = h;
        });
      console.log(this.directionns);
    },
    submit() {
      this.$http
        .patch("student/teacher", {
          teacherId: this.selectForm.teacher,
          directions: this.selectForm.directions
        })
        .then(h => {
          if (h) {
            this.$message.success("选择成功");
          }
        });
    }
  },
  computed: {
    ...mapState(["user"]),
    ...mapState(["teacheres"]),
    ...mapState(["directions"])
  },
  beforeCreate: function() {
    this.$store.dispatch("teacheres");
  }
};
</script>
<style scoped>
.student-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #409eff;
  border-radius: 3px;
}

.logoutBtn {
  margin: 13px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
