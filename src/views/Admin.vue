<template>
  <div class="admin" v-if="useCounterStore().isAdmin">
    <div class="container">
      <h2>Administration</h2>
      <div class="admin-info shadow-xl shadow-gray-200">
        <h2>Add Admin</h2>
        <div class="input">
          <input
            type="text"
            placeholder="Enter user email to make them an admin"
            id="addAdmins"
            v-model="adminEmail"
          />
        </div>
        <span class="text-sm text-green-500">{{ functionMsg }}</span>
        <button class="button" @click="makeAdmin">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { db2 } from "@/firebase/firebase";
import { useCounterStore } from "@/stores/counter";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref } from "vue";

const adminEmail = ref<string>("");
const functionMsg = ref<string>("");
const makeAdmin = async () => {
  if (typeof adminEmail.value === "string") {
    const q = query(
      collection(db2, "users"),

      where("email", "==", adminEmail.value)
    );
    if (q) {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc2) => {
        const washingtonRef = await doc(db2, "users", doc2.id);

        await updateDoc(washingtonRef, {
          admin: true,
        }).then(() => {
          functionMsg.value = `${doc2.data().firstName} is now an admin`;
        });
      });
    } else {
      console.error("There is no Such A USER");
    }
  }
};
</script>

<style scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 400;
      font-size: 32px;
    }
    .admin-info {
      border-radius: 8px;

      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      span {
        font-size: 14px;
        margin: auto;
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          color: black;
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
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
}
</style>
