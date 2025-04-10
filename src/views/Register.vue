<template>
  <div class="form-wrap">
    <form class="register" @submit.prevent>
      <p class="login-resigter">
        Already have an Account
        <router-link to="/login" class="border-b-2 solid font-semibold"
          >Login</router-link
        >
      </p>
      <h2>Create Your FireBlog account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <img
            src="../assets/Icons/user-alt-light.svg"
            class="icon"
            alt="first name icon"
          />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <img
            src="../assets/Icons/user-alt-light.svg"
            alt="last name icon"
            class="icon"
          />
        </div>
        <div class="input">
          <input type="text" placeholder="User" v-model="user" />
          <img
            src="../assets/Icons/user-alt-light.svg"
            alt="user icon"
            class="icon"
          />
        </div>

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
        <div class="error" v-if="error">{{ errorMsg }}</div>
      </div>

      <button @click="register">Sign Up</button>
      <div class="angel"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, db2 } from "../firebase/firebase";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useCounterStore } from "@/stores/counter";
const email = ref<any>("");
const password = ref<string>("");
const user = ref<string>("");
const id = ref<string | undefined>("");
const firstName = ref<string>("");
const lastName = ref<string>("");
const error = ref<boolean>(false);
const errorMsg = ref<string>("");
const router = useRouter();
const register = async () => {
  if (!email.value.includes("@gmail.com")) {
    email.value += "@gmail.com";
  }
  if (
    firstName.value.trim() === "" ||
    lastName.value.trim() === "" ||
    user.value.trim() === "" ||
    email.value.trim() === "" ||
    password.value.trim() === ""
  ) {
    error.value = true;
    errorMsg.value = "Please fill out all the fields";
    return;
  } else {
    createUserWithEmailAndPassword(getAuth(db), email.value, password.value)
      .then(async () => {
        if (typeof id.value === "string")
          id.value = await getAuth(db).currentUser?.uid;
        useCounterStore().getUserInfo(id.value);
        await addDoc(collection(db2, "users"), {
          firstName: firstName.value,
          lastName: lastName.value,
          username: user.value,
          email: email.value,
          admin: false,
          id: id.value,
        }).then(async (docRef) => {
          localStorage.setItem(email.value, password.value);
        });

        firstName.value = "";
        lastName.value = "";
        user.value = "";
        email.value = "";
        password.value = "";
        console.log(`Sucessfully registered`);
        router.push("/");
      })
      .catch((err) => {
        console.log(err.code);
        alert(err.message);
      });
  }
};
</script>

<style>
@import "tailwindcss";
.register {
}
.register h2 {
  @apply max-w-[350px];
}
</style>
