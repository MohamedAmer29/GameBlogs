<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ prop.modalMessage }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const prop = defineProps(["modalMessage"]);
const emit = defineEmits(["close-modal", "closeModal"]);

const closeModal = () => {
  emit("close-modal");
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  width: 300px;
  padding: 40px 30px;
  background-color: #fff;
}
p {
  text-align: center;
}
button {
  align-self: center;
}
</style>
