import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreateList from "../views/playlist/CreateList.vue";
import { projectAuth } from "@/firebase/config";

const requiredAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const noRequiredAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: requiredAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: noRequiredAuth,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: noRequiredAuth,
  },
  {
    path: "/playlist/create",
    name: "CreatePlayList",
    component: CreateList,
    beforeEnter: requiredAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
