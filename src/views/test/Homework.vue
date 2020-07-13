<template>

  <div v-if="homework">
    
    <el-form  :v-model="subForm" :rules="rules" v-for="(q,index) in homeworks" :key="index" >
       
        <div v-if="q.type==1" >
            <ol type="A">
                <el-form-item> <li> {{q.title}} </li></el-form-item>
                <el-form-item><label><input type="checkbox" :v-model="subForm.current" /><li> {{q.current}} </li></label></el-form-item>
                <el-form-item><label><input type="checkbox" :v-model="subForm.error1"/><li> {{q.error1}} </li></label></el-form-item>
                <el-form-item><label><input type="checkbox" :v-model="subForm.error2"/><li> {{q.error2}} </li></label></el-form-item>
                <el-form-item><label><input type="checkbox" :v-model="subForm.error3"/><li> {{q.error3}} </li></label></el-form-item>
            </ol>
        </div>
        <div v-if="q.type==2" >
           <el-form-item> <p> {{q.title}} <input type="text" :v-model="subForm.detail"/> </p></el-form-item>
        </div>
        <div v-if="q.type==3">
            <el-form-item><p> {{q.title}} </p></el-form-item>
            <el-form-item><label><input type="checkbox" :v-model="subForm.current">√ </label></el-form-item>
            <el-form-item><label><input type="checkbox" :v-model="subForm.current">× </label></el-form-item>
        </div>
        <div v-if="q.type==4">
           <el-form-item> <p>{{q.title}}</p></el-form-item>
            <el-form-item><input type="text" row="30" col="30" :v-model="subForm.current" /></el-form-item>
        </div>
        <el-button @click="subAns" >
      确认
    </el-button>
    </el-form >
  </div>
</template>
<script>
import { GET_HOMEWORK } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["hid"],
 
subForm: {
      id: null,
      isTest:null,
      title: null,
      detail: null,
      current:null,
      error1:null,
      error2:null,
      error3:null,
      type: null,
    
  },
   rules: {
      isTest: [{ required: true, message: "不可为空", trigger: "blur" }],
     
      title: [{ required: true, message: "不可为空", trigger: "blur" }],
     
      type: [{ required: true, message: "不可为空", trigger: "blur" }],
      detail: [{ required: true, message: "不可为空", trigger: "blur" }],
      current:[{ required: true, message: "不可为空", trigger: "blur" }],
      error1:[{ required: true, message: "不可为空", trigger: "blur" }],
      error2:[{ required: true, message: "不可为空", trigger: "blur" }],
      error3:[{ required: true, message: "不可为空", trigger: "blur" }],
    },
  created() {
    this.$store.dispatch(GET_HOMEWORK, { hid: this.hid });
  },
  computed: {
    ...mapState(["homeworks"]),

  },
  methods:{
     async submitHomework() {
      this.subForm.id = this.cid;
      let res = await this.$http.post("annswerTestQuestion", this.subForm);
      if (res != null) {
        this.$router.go(0);
        this.$message.success("添加成功");
      }
    }
  }
};
</script>
