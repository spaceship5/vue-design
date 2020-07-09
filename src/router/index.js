import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Welcome from "@/components/Welcome.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
];

const router = new VueRouter({
  routes
});

export default router;
// 后期载入路由
let adminRouts = [
  {
    path: "/admin",
    component: () => import("@/views/Admin.vue"),}
];
let teacherRouts = [
  
    
];
let studentRouts = [
];
const teacherRole = "4bcbb36cf4cf63bc4b";
const studentRole = "534bcf636cf6cb0cf6";
const adminRole = "2a4bcfa36cf6340dv6";

export function updateRoutes() {
  switch (sessionStorage.getItem("role")) {
    case adminRole:
      router.addRoutes(adminRouts);
      router.addRoutes(teacherRouts);
      router.addRoutes(studentRouts);
      break;
    case teacherRole:
      router.addRoutes(teacherRouts);
      break;
    case studentRole:
      router.addRoutes(studentRouts);
      break;
  }
}
updateRoutes();
