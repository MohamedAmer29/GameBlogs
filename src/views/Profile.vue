<template>
  <Loading v-if="loading" />
  <div class="profile">
    <Modal
      id="modal"
      v-on:close-modal="closeModal"
      v-if="modalActive"
      :modalMessage="modalMessage"
    />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info shadow-xl shadow-gray-200">
        <div class="initials">{{ useCounterStore().profileInitials }}</div>
        <div class="admin-badge" v-if="useCounterStore().isAdmin">
          <img
            src="../assets/Icons/user-crown-light.svg"
            alt="admin"
            class="icon"
          />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            :disabled="!useCounterStore().isAdmin"
          />
        </div>
        <div class="input">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            :disabled="!useCounterStore().isAdmin"
          />
        </div>
        <div class="input">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            :disabled="!useCounterStore().isAdmin"
          />
        </div>
        <div class="input">
          <label for="email">Email</label>
          <div class="flex justify-between">
            <input
              type="email"
              v-model="email"
              disabled
              class="cursor-not-allowed"
            />
            <button
              id="changePass"
              v-if="useCounterStore().isAdmin"
              @click="changePass"
            >
              Change Password
            </button>
          </div>
        </div>
        <button @click="saveChanges" v-if="useCounterStore().isAdmin">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Moddal.vue";
import { db, db2 } from "@/firebase/firebase";
import { useCounterStore } from "@/stores/counter";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { onMounted, ref } from "vue";
const modalMessage = ref<string>("Changes were saved!");

const modalActive = ref<boolean>(false);
const firstName = ref<string | null>(useCounterStore().profileFirstName);
const lastName = ref<string | null>(useCounterStore().profileLastName);
const username = ref<string | null>(useCounterStore().profileUserName);
const loading = ref<boolean>(false);
const email = ref<string | null>(useCounterStore().profileEmail);
onMounted(() => {
  window.addEventListener("load", () => {
    loading.value = true;
  });
  const interval = setInterval(() => {
    firstName.value = useCounterStore().profileFirstName;
    lastName.value = useCounterStore().profileLastName;
    username.value = useCounterStore().profileUserName;
    email.value = useCounterStore().profileEmail;
  }, 100);
  interval;
  setTimeout(() => {
    if (typeof useCounterStore().profileFirstName == "object") {
      location.reload();
    }
    clearInterval(interval);
  }, 1200);
});
setTimeout(() => (loading.value = false), 1500);

const closeModal = () => {
  modalActive.value = false;
  location.reload();
};
const changePass = async () => {
  const auth = getAuth(db);

  if (email.value != null)
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        modalActive.value = true;
        modalMessage.value = "Please check your Gmail inbox!";
      })
      .catch((error) => {
        console.log(error);

        // ..
      });
};

const saveChanges = async () => {
  const querySnapshot = await getDocs(collection(db2, "users"));
  querySnapshot.forEach(async (doc2) => {
    const washingtonRef = await doc(db2, "users", doc2.id);
    const docSnap = await getDoc(washingtonRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    await updateDoc(washingtonRef, {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      email: email.value,
    }).then(() => {
      modalActive.value = true;
      modalMessage.value = "Updated!";
    });
  });
};
</script>

<style scoped>
input[disabled] {
  cursor: text;
}
#email {
  width: 60%;
}
#changePass {
  padding: 7px 5px;
  font-size: medium;
  margin: 0;
  width: 21rem;
  margin-left: 2rem;
  background-color: #6e6e6e;
  &:hover {
    opacity: 90%;
  }
}
#modal {
  margin-top: 14rem;
  max-height: 120%;
}
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 400;

      font-size: 32px;
    }
    .profile-info {
      border-radius: 8px;

      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: white;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .admin-badge {
        display: flex;
        align-self: center;
        color: white;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;
        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }
      .input {
        margin: 16px 0;
        label {
          color: black;
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          color: black;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
        }
        &:focus {
          outline: none;
        }
      }
    }
    button {
      align-self: center;
    }
  }
}
</style>
