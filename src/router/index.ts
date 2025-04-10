import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Blogs from "@/views/Blogs.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import Profile from "@/views/Profile.vue";
import Admin from "@/views/Admin.vue";
import CreatePost from "@/views/CreatePost.vue";
import BlogPreview from "@/views/BlogPreview.vue";
import ViewBlog from "@/views/ViewBlog.vue";
import EditBlog from "@/views/EditBlog.vue";
import { useCounterStore } from "@/stores/counter";
import { db } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/blogs",
      name: "blogs",
      component: Blogs,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: ForgotPassword,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/create-post",
      name: "createPost",
      component: CreatePost,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/post-preview",
      name: "blogPreview",
      component: BlogPreview,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/view-blog/:blogid",
      name: "viewBlog",
      component: ViewBlog,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/edit-blog/:blogid",
      name: "editBlog",
      component: EditBlog,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  document.title = `${String(to.name)} | FireBlog`;
  next();
});
router.beforeEach(async (to, from, next) => {
  let user = getAuth(db).currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    admin = useCounterStore().isAdmin;
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next("/");
      }
      return next();
    }
    return next("/");
  }
  return next();
});
export default router;
