<template>
  <div>
    <el-form :model="submitForm" class="sumbit" :rules="rules">
      <h1>添加方向</h1>
      <el-form-item label="方向名称" prop="name">
        <el-input v-model="submitForm.name"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit">
        添加方向
      </el-button>
    </el-form>
    <h1>方向列表</h1>
    <el-table :data="directions" style="width: 100%">
      <el-table-column label="编号" width="500">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="方向名称" width="500">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>更新时间: {{ scope.row.updateTime }}</p>
            <p>插入时间: {{ scope.row.updateTime }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" @click="directionElective(scope.row)">
                {{ scope.row.name }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form :model="updateForm" class="sumbit" :rules="rules">
        <h1>修改方向</h1>
        <el-form-item label="方向名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>

          <el-button type="primary" @click="update">
            更新方向
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.updateForm.id = row.id;
      this.updateForm.name = row.name;
    },
    async handleDelete(index, row) {
      let res = await this.$http.delete("/teacher/direction/" + row.id);
      if (res.data == true) {
        this.$message.success("删除成功");
        this.$router.go(0);
      }
      console.log(index, row);
    },
    async submit() {
      let res = await this.$http.post("/teacher/direction", this.submitForm);
      if (res != null) {
        this.$message.success("添加成功");
        this.$router.go(0);
      }
    },
    async update() {
      let res = await this.$http.patch("/teacher/direction", this.updateForm);
      if (res != null) {
        this.$message.success("修改成功");
        this.centerDialogVisible = false;
        this.$router.go(0);
      }
    },
    directionElective(row) {
      this.$router.push("/directionElective/" + row.id);
    }
  },
  data() {
    return {
      directions: [],
      submitForm: {
        name: null
      },
      rules: {
        name: [{ required: true, message: "请输入方向名称", trigger: "blur" }]
      },
      updateForm: {
        name: null,
        id: null
      },
      centerDialogVisible: false
    };
  },
  async created() {
    let res = await this.$http.get("/teacher/directions");
    console.log(res);
    this.directions = res.data.directions;
  }
};
</script>
