import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login }
];

const router = new VueRouter({
  routes
});

export default router;
// 后期载入路由
let adminRouts = [
  {
    path: "/admin",
    component: () => import("@/views/admin/Admin.vue"),
    children: [
      {
        path: "/admin/setting",
        component: () => import("@/views/admin/Setting.vue")
      },
      {
        path: "/admin/teacher",
        component: () => import("@/views/admin/Teacher.vue")
      },
      {
        path: "/admin/student",
        component: () => import("@/views/admin/Student.vue")
      }
    ]
  }
];
let teacherRouts = [
  {
    path: "/teacher",
    component: () => import("@/views/teacher/Teacher.vue"),
    children: [
      {
        path: "/teacher/courses",
        component: () => import("@/views/teacher/Courses.vue")
      },
      {
        path: "/teacher/setting",
        component: () => import("@/views/teacher/Setting.vue")
      },
      {
        props: true,
        path: "/teacher/courses/:cid/homeworks",
        component: () => import("@/views/teacher/HomeWorkList.vue")
      },
      {
        props: true,
        path: "/teacher/courses/:cid/tests",
        component: () => import("@/views/teacher/TestList.vue")
      },
      {
        props: true,
        path: "/teacher/courses/:cid/tests/:tid/addTestQuestion",
        component: () => import("@/views/teacher/AddTestQuestion.vue")
      },
      {
        props: true,
        path: "/teacher/courses/:cid/tests/:tid/testQuestion",
        component: () => import("@/views/teacher/TestQuestions.vue")
      },
      {
        path: "/teacher/course/:cid",
        props: true,
        component: () => import("@/views/teacher/Course.vue")
      },
      {
        path: "/teacher/course/:cid/resource/:rid",
        props: true,
        component: () => import("@/views/teacher/Resource.vue")
      },
      {
        path: "/teacher/course/:cid/question/:qid",
        props: true,
        component: () => import("@/views/teacher/Question.vue")
      }
    ]
  }
];
let studentRouts = [
  {
    path: "/student",
    component: () => import("@/views/student/Student.vue"),
    children: [
      {
        path: "/student/courses",
        component: () => import("@/views/student/Courses.vue")
      },
      {
        path: "/student/mycourse",
        component: () => import("@/views/student/MyCourse.vue")
      },
      {
        path: "/student/setting",
        component: () => import("@/views/student/Setting.vue")
      },
      {
        path: "/student/course/:cid",
        props: true,
        component: () => import("@/views/student/Course.vue")
      },
      {
        path: "/student/course/:cid/homeWorkList",
        props: true,
        component: () => import("@/views/student/HomeWorkList.vue")
      },
      {
        path: "/student/course/:cid/testList",
        props: true,
        component: () => import("@/views/student/TestList.vue")
      },
      {
        path: "/student/course/:cid/tests/:tid/test",
        props: true,
        component: () => import("@/views/student/TestQuestion.vue")
      },
      {
        path: "/student/course/:cid/resource/:rid",
        props: true,
        component: () => import("@/views/student/Resource.vue")
      },
      {
        path: "/student/course/:cid/question/:qid",
        props: true,
        component: () => import("@/views/student/Question.vue")
      }
    ]
  }
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
