<template>
  <div>
    <form>
      <input type="file" @change="read" />
      <el-button type="primary" @click="up">上传</el-button>
    </form>
  </div>
</template>
<script>
import xlsx from "xlsx";
export default {
  methods: {
    read(event) {
      let file = event.target.files[0];
      let students = [];
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = event => {
        let data = event.target.result;
        let workbook = xlsx.read(data, { type: "binary" });
        let sheet = workbook.Sheets[workbook.SheetNames[0]];
        xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
          let number = parseInt(r.__EMPTY);
          if (!isNaN(number)) {
            let stu = {
              number: r.__EMPTY,
              name: r.__EMPTY_1,
              grade: r.__EMPTY_9
            };
            students.push(stu);
          }
        });
      };
      console.log(students);
    },
    up() {}
  }
};
</script>
