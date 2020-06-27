<template>
  <div id="app">
    <router-view></router-view>
    <alertdialog />
  </div>
</template>

<script>
export default {
  components: {
    alertdialog: () => import("@/components/AlertDialog.vue")
  }
};
</script>

<style></style>
