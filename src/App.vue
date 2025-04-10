<template>
  <div class="app-wrapper">
    <div class="app" v-if="useCounterStore().postLoaded">
      <Navigation v-if="!navigationDisabled" />
      <RouterView />
      <Footer v-if="!navigationDisabled" />
    </div>
    <Loading v-else />
  </div>
</template>

<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import "firebase/auth";
import Footer from "./components/Footer.vue";
import { RouterView, useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { getAuth } from "firebase/auth";
import { db } from "./firebase/firebase";
import { useCounterStore } from "./stores/counter";
import Loading from "./components/Loading.vue";

const route = useRoute();
const navigationDisabled = computed(() => {
  if (
    route.name === "register" ||
    route.name === "login" ||
    route.name === "forgotPassword"
  )
    return true;
  return false;
});
onMounted(async () => {
  const interval = setInterval(() => {
    const user = getAuth(db).currentUser;
    useCounterStore().getUserInfo(user?.uid);
  }, 100);
  interval;
  setTimeout(() => clearInterval(interval), 1500);
  useCounterStore().getPost();
});
</script>

<style>
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
}

.link-light {
  color: #fff;
}
.arrow {
  margin-left: 8px;
  width: 12px;
  filter: invert(93%) sepia(19%) saturate(6366%) hue-rotate(119deg)
    brightness(100%) contrast(107%);
}

.arrow-light {
  path {
    fill: #fff;
  }
}
button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}
.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}
.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}
.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
.blog-card-wrap {
  @apply relative py-[80px] px-[16px];
}
.blog-card {
  @apply grid gap-[32px] grid-cols-1;
}
@media (min-width: 500px) {
  .blog-card-wrap {
    @apply py-[100px] px-[16px];
  }
  .blog-card {
    @apply grid-cols-2;
  }
}
@media (min-width: 900px) {
  .blog-card {
    @apply grid-cols-3;
  }
}
@media (min-width: 1200px) {
  .blog-card {
    @apply grid-cols-4;
  }
}
/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 10px 4px 5px rgb(251, 237, 237);
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(121, 118, 118);
  border-radius: 20px;
}
</style>
