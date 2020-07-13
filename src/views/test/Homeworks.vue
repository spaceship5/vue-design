<template>
  <div>
    <h1>作业列表</h1>
    <ul>
      <li v-for="(h, index) in homeworks" :key="index">
        
          {{ h.title }}
        <button type="button" @click="toHomework(h.id)">答题</button>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script>
import { LIST_HOMEWORKS } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  porps:["cid"],
  created() {
    this.$store.dispatch(LIST_HOMEWORKS);
  },
  methods:{
    toHomework(hid){
       this.$router.push("/student/course/" + this.cid+"/tests/"+this.hid);
    }
  },
  computed: {
    ...mapState(["homeworks"])
  }
};
</script>