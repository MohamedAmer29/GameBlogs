<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@import "tailwindcss";
.loading {
  @apply top-0 z-[101] h-full w-full bg-[rgba(0,0,0,0.5)] fixed flex justify-center items-center;
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
}
span {
  @apply block w-[60px] h-[60px] rounded-[50%] m-auto;

  border: 5px solid transparent;
  border-top-color: white;
  border-bottom-color: white;
  animation: spin ease 2000ms infinite;
}
</style>
