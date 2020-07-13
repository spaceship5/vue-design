<template>
  <div>
    <h1>考试列表</h1>
    <ul>
      <li v-for="(t, index) in tests" :key="index">
       
          {{ t.title }}
        <button type="button" @click="toTest(t.id)">答题</button>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script>
import { LIST_TESTS } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch(LIST_TESTS);
  },
  methods:{
    toTest(hid){
       this.$router.push("/student/course/" + this.cid+"/tests/"+this.hid);
    }
  },
  computed: {
    ...mapState(["tests"])
  }
};
</script>