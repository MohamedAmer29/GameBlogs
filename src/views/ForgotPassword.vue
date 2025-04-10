<template>
  <div class="reset-password">
    <Modal
      v-on:close-modal="closeModal"
      v-if="modalActive"
      :modalMessage="modalMessage"
    />

    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="rest" @submit.prevent="resetPassword">
        <p class="login-resigter">
          Already have an Account
          <router-link to="/login" class="border-b-2 solid font-semibold"
            >Login</router-link
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <img
              src="../assets/Icons/envelope-regular.svg"
              alt=""
              class="icon"
            />
          </div>
        </div>
        <button>Reset</button>
        <div class="angel"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Moddal.vue";
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { db } from "../firebase/firebase";
const modalActive = ref<boolean>(false);
const loading = ref<boolean>(false);
const modalMessage = ref<string>("");
const email = ref<string>("");

const closeModal = () => {
  modalActive.value = false;
  email.value = "";
};
const resetPassword = () => {
  loading.value = true;
  sendPasswordResetEmail(getAuth(db), email.value)
    .then(() => {
      modalMessage.value =
        "if your account exists, you will receive a password";
      loading.value = false;
      modalActive.value = true;
    })
    .catch((err) => {
      modalMessage.value = err.message;
      loading.value = false;
      modalActive.value = true;
    });
};
</script>

<style scoped>
.reset-password {
  position: relative;
}
.form-wrap .reset h2 {
  margin-bottom: 8px;
}
.reset p {
  text-align: center;
  margin-bottom: 32px;
}
</style>
