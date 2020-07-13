<template>
  <div> </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  watch: {
    exception() {
      this.$message.error(this.exception.message);
    }
  },
  computed: {
    ...mapState({ exception: state => state.exception })
  }
};
</script>
