<template>
  <div class="post-view">
    <span class="flex !mt-4 cursor-pointer w-fit" @click="router.go(-1)">
      <img
        src="../assets/Icons/thin-arrow-left-icon.svg"
        class="!w-10 !mx-2 arrow"
      />
      <span class="text-lg">back</span>
    </span>
    <div class="container">
      <div
        class="quillWrapper content-center flex flex-col max-w-[90%] !m-auto gap-8 items-center bg-gray-400 !mt-2 !p-4 rounded-2x"
      >
        <h1 class="text-4xl">{{ useCounterStore().blogTitle }}</h1>
        <img :src="useCounterStore().blogFileURL" alt="" />
        <div v-html="useCounterStore().blogHtml"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style>
@import "tailwindcss";
ol {
  list-style: auto;
}
.post-view {
  min-height: 100%;
  .container {
    @apply max-w-[1000px];
    padding: 60px 25px;
  }
  .ql-editor {
    padding: 0;
  }
  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
