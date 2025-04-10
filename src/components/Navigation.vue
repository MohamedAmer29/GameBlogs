<template>
  <div>
    <header>
      <nav class="container" @click="mobileNav = false">
        <div class="branding">
          <router-link
            :to="{ name: 'home' }"
            class="header"
            @click="profileMenu = false"
            >GameBlogs</router-link
          >
        </div>
        <div class="nav-links" v-if="!mobile">
          <ul @click="profileMenu = false">
            <router-link class="link" to="/">Home</router-link>
            <routerLink class="link" to="/blogs">Blogs</routerLink>
            <router-link
              class="text-xl font-bold text-[#088DA5]"
              v-if="useCounterStore().isAdmin"
              to="/create-post"
              >Create Post</router-link
            >
            <a class="link" href="/login" v-if="!useCounterStore().isLoggedIn">
              Login/Register</a
            >
          </ul>
          <button
            @click="toggle"
            :style="{ backgroundColor: color }"
            id="togglescreen"
          >
            <img src="../assets/Icons/alt-brightness-svgrepo-com.svg" alt="" />
          </button>
          <div
            :style="{ backgroundColor: color }"
            v-if="useCounterStore().isLoggedIn"
            class="profile"
            ref="profile"
            @click.self="profileMenu = !profileMenu"
          >
            <span @click.self="profileMenu = !profileMenu">{{
              useCounterStore().profileInitials
            }}</span>
            <div
              class="profile-menu"
              v-if="profileMenu"
              :style="{ backgroundColor: color }"
            >
              <div class="info">
                <p class="initials">{{ useCounterStore().profileInitials }}</p>
                <div class="right">
                  <p>
                    {{ useCounterStore().profileFirstName }}
                    {{ useCounterStore().profileLastName }}
                  </p>
                  <p>{{ useCounterStore().profileUserName }}</p>
                  <p>{{ useCounterStore().profileEmail }}</p>
                </div>
              </div>
              <div class="options" @click="profileMenu = false">
                <div class="option">
                  <router-link class="option" to="/profile">
                    <img
                      src="../assets/Icons/user-alt-light.svg"
                      class="icon"
                      alt="user icon"
                    />
                    <p>Profile</p>
                  </router-link>
                </div>
                <div class="option" v-if="useCounterStore().isAdmin">
                  <router-link class="option" to="/admin">
                    <img
                      src="../assets/Icons/user-crown-light.svg"
                      class="icon"
                      alt="admin icon"
                    />
                    <p>Admin</p>
                  </router-link>
                </div>
                <div class="option" @click="handleSignOut">
                  <img
                    src="../assets/Icons/sign-out-alt-regular.svg"
                    class="icon"
                    alt="signout icon"
                  />
                  <p>Sign Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <img
        class="iconMenu"
        v-if="mobile"
        @click="(mobileNav = !mobileNav), (profileMenu = false)"
        src="@/assets/Icons/bars-regular.svg"
        alt="bar image"
      />
      <button
        @click="toggle"
        id="toggle"
        :style="{ backgroundColor: color }"
        v-if="mobile"
      >
        <img src="../assets/Icons/alt-brightness-svgrepo-com.svg" alt="" />
      </button>
      <div
        v-if="useCounterStore().isLoggedIn && mobile"
        class="profile"
        id="mob-profile"
        ref="profile"
        :style="{ backgroundColor: color }"
        @click.self="profileMenu = !profileMenu"
      >
        <span @click.self="(profileMenu = !profileMenu), (mobileNav = false)">{{
          useCounterStore().profileInitials
        }}</span>

        <div
          class="profile-menu"
          id="mob-menu"
          v-if="profileMenu"
          :style="{ backgroundColor: color }"
        >
          <div class="info">
            <p class="initials">
              {{ useCounterStore().profileInitials }}
            </p>
            <div class="right">
              <p>
                {{ useCounterStore().profileFirstName }}
                {{ useCounterStore().profileLastName }}
              </p>
              <p>{{ useCounterStore().profileUserName }}</p>
              <p>{{ useCounterStore().profileEmail }}</p>
            </div>
          </div>

          <div
            class="options"
            @click="profileMenu = false"
            :style="{ backgroundColor: color }"
          >
            <div class="option w-full">
              <router-link class="option" to="/profile">
                <img
                  src="../assets/Icons/user-alt-light.svg"
                  class="icon"
                  alt="user icon"
                />
                <p>Profile</p>
              </router-link>
            </div>
            <div class="option w-full" v-if="useCounterStore().isAdmin">
              <router-link class="option" to="/admin">
                <img
                  src="../assets/Icons/user-crown-light.svg"
                  class="icon"
                  alt="admin icon"
                />
                <p>Admin</p>
              </router-link>
            </div>
            <div class="option w-full" @click="handleSignOut">
              <img
                src="../assets/Icons/sign-out-alt-regular.svg"
                class="icon"
                alt="signout icon"
              />
              <p>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
      <transition name="mobileNav" :style="{ backgroundColor: color }">
        <div class="mobile-nav" v-if="mobileNav" @click="profileMenu = false">
          <ul @click="mobileNav = false">
            <router-link class="link" to="/">Home</router-link>
            <routerLink class="link" to="/blogs">Blogs</routerLink>
            <router-link
              class="link"
              v-if="useCounterStore().isAdmin"
              to="/create-post"
              >Create Post</router-link
            >
            <a class="link" href="/login" v-if="!isLoggedIn">Login/Register</a>
          </ul>
        </div>
      </transition>
    </header>
  </div>
</template>

<script setup lang="ts">
import { db } from "@/firebase/firebase";
import { useCounterStore } from "@/stores/counter";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const mobile = ref<boolean>(false);
const mobileNav = ref<boolean>(false);
const profileMenu = ref<boolean>(useCounterStore().profileMenu);
const windowWidth = ref<number>(window.innerWidth);
const isLoggedIn = ref<boolean>(false);
const router = useRouter();
const route = useRoute();
const color = ref<string>("#303030");
const toggle = () => {
  document.documentElement.classList.toggle("my-app-dark");
  if (!document.documentElement.classList.contains("my-app-dark")) {
    useCounterStore().isDark = false;
    color.value = "#696969";
  } else {
    useCounterStore().isDark = true;
    color.value = "#303030";
  }
};
onMounted(() => {
  if (!document.documentElement.classList.contains("my-app-dark")) {
    color.value = "#696969";
  } else {
    color.value = "#303030";
    useCounterStore().isDark = true;
  }
  if (window.innerWidth <= 750) mobile.value = true;
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
    if (windowWidth.value <= 750) {
      mobile.value = true;

      return;
    }
    mobile.value = false;
    mobileNav.value = false;
  });
  onAuthStateChanged(getAuth(db), (logged) => {
    if (logged) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
    useCounterStore().isLoggedIn = isLoggedIn.value;
  });
});
const handleSignOut = () => {
  signOut(getAuth(db)).then(() => {
    if (route.path === "/profile" || route.path === "/admin") {
      router.push("/");
    } else {
      location.reload();
    }
  });
};
</script>

<style scoped>
@import "tailwindcss";
#togglescreen {
  @apply relative top-0 right-[20px] w-[43px] h-[43px] p-2 rounded-full m-0;
}
#toggle {
  @apply absolute top-[24px] right-[110px] w-[43px] h-[43px] p-2 rounded-full m-0;
}
header {
  box-shadow: -2px 0 10px 3px;
  @apply py-0 py-[5px] mb-1 shadow-gray-300 z-30;
}
.link {
  @apply font-semibold py-0 px-2 transition-colors duration-300 ease-in hover:text-[#1eb8b8];
}
nav {
  @apply flex py-[15px] px-0;
}
.branding {
  @apply flex items-center;
}
.header {
  @apply font-bold text-3xl;
}
.nav-links {
  @apply relative flex items-center justify-end w-full;
}
ul {
  @apply mr-8;
}
ul .link {
  @apply mr-8;
}
ul .link:last-child {
  @apply text-[#1eb8b8];
}
.iconMenu {
  @apply cursor-pointer absolute top-8 right-[25px] h-[25px] w-auto;
}
.mobile-nav {
  @apply p-[20px] w-[70%] max-w-[250px] flex flex-col fixed h-[100%] bg-[#00FFFF] top-0 left-0 z-[101];
}
.mobile-nav .link {
  @apply inline-block p-[15px] text-white hover:text-[#1eb8b8];
}
.mobileNav-enter-active {
  transition: all 1s ease;
}
.mobileNav-leave-active {
  transition: all 1s ease;
}
.mobileNav-enter-from {
  transform: translateX(-250px);
}
.mobileNav-enter-to {
  transform: translateX(0);
}

.mobileNav-leave-to {
  transform: translateX(-250px);
}
.profile {
  @apply relative cursor-pointer flex items-center justify-center w-[40px] h-[40px] rounded-full text-white right-3 bg-[#00FFFF];
}
#header {
  color: #00ffff;
}
#mob-profile {
  @apply absolute right-[60px] top-6;
  @media (max-width: 300) {
    right: 10px;
    top: 50px;
  }
}
.profile-menu {
  @apply absolute top-[45px] rounded-b-4xl rounded-tl-4xl right-4 w-[250px] bg-[#00FFFF];
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 101;
}
.info {
  @apply flex items-center p-[15px];
  border-bottom: 1px solid white;
}
.initials {
  position: initial;
  width: 40px;
  height: 40px;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.right {
  flex: 1;
  margin-left: 24px;
  p:nth-child(1) {
    font-size: 14px;
  }
  p:nth-child(2),
  p:nth-child(3) {
    font-size: 12px;
  }
}
.options {
  padding: 15px;
  .option {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .icon {
      width: 18px;
      height: auto;
    }
    p {
      font-size: 14px;
      margin-left: 12px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
