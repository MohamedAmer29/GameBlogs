<template>
  <form class="login" @submit.prevent="login">
    <p class="login-resigter">
      Don't have an account?
      <router-link to="/register" class="border-b-2 solid font-semibold"
        >Register</router-link
      >
    </p>
    <h2>Login to FireBlogs</h2>
    <div class="inputs">
      <div class="input">
        <input type="text" placeholder="Email" v-model="email" />
        <img
          src="../assets/Icons/envelope-regular.svg"
          alt="email icon"
          class="icon"
        />
      </div>
      <div class="input">
        <input type="password" placeholder="Password" v-model="password" />
        <img
          src="../assets/Icons/lock-alt-solid.svg"
          alt="password icon"
          class="icon"
        />
      </div>
      <div class="error">{{ errorMsg }}</div>
    </div>
    <router-link class="forgot-password" to="/forgotPassword"
      >Forgot your password</router-link
    >
    <button>Sign In</button>
    <!-- <div class="angel"></div> -->
  </form>
  <div class="background"></div>
</template>

<script setup lang="ts">
import { db } from "@/firebase/firebase";
import { useCounterStore } from "@/stores/counter";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const error = ref<boolean>(false);
const errorMsg = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const login = async () => {
  signInWithEmailAndPassword(getAuth(db), email.value, password.value)
    .then(() => {
      const user = getAuth(db).currentUser;
      error.value = false;
      errorMsg.value = "";
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      useCounterStore().getUserInfo(user?.uid);
      router.push("/");
    })
    .catch((err) => {
      error.value = true;
      console.log(err.code);

      switch (err.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid email";
          break;

        case "auth/invalid-credential":
          errorMsg.value = "Incorrect password";
          break;
        case "auth/user-not-found":
          errorMsg.value = "User not found";
          break;
        default:
          errorMsg.value = "An error occurred";
      }
    });
};
</script>

<style>
@import "tailwindcss";
.form-wrap {
  @apply flex  h-[100vh] justify-center self-center m-auto w-[90%];
}

.login-register {
  @apply mb-[32px];
}
.router-link {
  @apply text-black;
}
form {
  @apply p-0 px-[10px] h-full w-full relative flex flex-col justify-center items-center;
  flex: 1;
}
h2 {
  @apply font-sans text-center text-[32px] font-semibold text-[#303030] mb-[40px];
}
.inputs {
  @apply w-full max-w-[350px];
}
.inputs .input {
  @apply relative flex gap-4 justify-center items-center mb-[8px];
}
.input input {
  @apply w-full  border-none  bg-[#f2f7f6] py-[4px] pr-[4px] pl-[30px] h-[50px] rounded-md;
}
input:focus {
  outline: none;
}
.input .icon {
  width: 12px;
  position: absolute;
  left: 6px;
}
.forgot-password {
  @apply text-black cursor-pointer font-[14px] mx-0 mt-[16px] mb-[32px] border-b-[1px] border-solid border-b-transparent;
  text-decoration: none;
  transition: 0.5s ease all;
}
.forgot-password:hover {
  border-color: #303030;
}
.angel {
  display: none;
  position: absolute;
  background-color: #fff;
  transform: rotateZ(3deg);
  right: -30px;
  width: 60px;
  top: -8px;
  height: 101%;
}
.background {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: url("../assets/background.png");

  height: 100%;
  width: 100%;
}
@media (min-width: 900px) {
  .form-wrap {
    width: 100%;
  }
  form {
    padding: 0 50px;
  }
  h2 {
    font-size: 40px;
  }
  .angel {
    display: initial;
  }
  .background {
    display: initial;
  }
}
</style>
