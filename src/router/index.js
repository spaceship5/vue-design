import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Welcome from "@/components/Welcome.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/updateByxlsx",
    component: () => import("@/views/UpdateByxlsx.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
// 后期载入路由
let adminRouts = [
  {
    path: "/admin",
    component: () => import("@/views/Admin.vue"),
    children: [
      {
        path: "/addTeacher",
        component: () => import("@/views/admin/AddTeacher.vue")
      },
      {
        path: "/listTeacher",
        component: () => import("@/views/admin/ListTeacher.vue")
      },
      {
        path: "/adminSetting",
        component: () => import("@/views/admin/Setting.vue")
      }
    ]
  }
];
let teacherRouts = [
  {
    path: "/teacher",
    component: () => import("@/views/Teacher.vue"),
    redirect: "welcome",
    children: [
      { path: "/welcome", component: Welcome },
      {
        path: "/direction",
        component: () => import("@/views/teacher/Direction.vue")
      },
      {
        path: "/selectStudent",
        component: () => import("@/views/teacher/SelectStudent.vue")
      },
      {
        path: "/addStudent",
        component: () => import("@/views/teacher/AddStudent.vue")
      },
      {
        path: "/setting",
        component: () => import("@/views/teacher/Setting.vue")
      },
      {
        path: "/course",
        component: () => import("@/views/teacher/Course.vue")
      },
      {
        props: true,
        path: "/courseElective/:cid",
        component: () => import("@/views/teacher/CourseElectiveByC.vue")
      },
      {
        props: true,
        path: "/student/:sid",
        component: () => import("@/views/teacher/Student.vue")
      },
      {
        props: true,
        path: "/directionElective/:did",
        component: () => import("@/views/teacher/DirectionElectiveByD.vue")
      }
    ]
  }
];
let studentRouts = [
  { path: "/student", component: () => import("@/views/Student.vue") }
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
