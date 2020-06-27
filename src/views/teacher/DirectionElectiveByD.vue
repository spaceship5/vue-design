<template>
  <div>
    <h1>学生选择方向列表</h1>
    <el-table :data="directionElectives" style="width: 100%">
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.direction.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学生名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ scope.row.student.user.name }}
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="分数" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.grade }}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
export default {
  props: ["did"],
  methods: {},
  data() {
    return {
      centerDialogVisible: false,
      directionElectives: []
    };
  },
  async created() {
    let res = await this.$http.get(
      "/teacher/directionElectiveByDirectionId/" + this.did
    );
    this.directionElectives = res.data;
  }
};
</script>
