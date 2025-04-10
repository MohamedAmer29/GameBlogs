<template>
  <div class="post-view" v-if="currentBlog[0]">
    <span class="flex !mt-4 cursor-pointer" @click="router.go(-1)">
      <img
        src="../assets/Icons/thin-arrow-left-icon.svg"
        class="!w-10 !mx-2 arrow"
      />
      <span class="text-lg">back</span>
    </span>
    <div class="container">
      <div
        class="quillWrapper content-center flex flex-col max-w-[90%] !m-auto gap-8 items-center bg-gray-400 !mt-2 !p-4 rounded-2xl"
      >
        <h1 class="text-4xl">{{ currentBlog[0].blogTitle }}</h1>
        <p class="self-start">
          posted on: {{ new Date(currentBlog[0].date).toUTCString() }}
        </p>
        <img :src="currentBlog[0].blogUrl" alt="" />
        <div class="w-full text-wrap overflow-auto divScroll">
          <div
            class="text-wrap w-full"
            v-html="currentBlog[0].blogHtml.slice(0, 230)"
          ></div>
          <div
            class="text-wrap w-full"
            v-html="currentBlog[0].blogHtml.slice(230, 440)"
          ></div>
          <div
            class="text-wrap w-full"
            v-html="currentBlog[0].blogHtml.slice(440, 740)"
          ></div>
          <div
            class="text-wrap w-full"
            v-html="currentBlog[0].blogHtml.slice(740, 900)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const currentBlog = ref<any[]>([]);
const route = useRoute();
const router = useRouter();
currentBlog.value = useCounterStore().blogPosts.filter((post) => {
  //@ts-ignore
  return post.id === route.params.blogid;
});

setTimeout(() => {
  if (currentBlog.value[0] == undefined) window.location.reload();
}, 100);
</script>

<style scoped>
.container img {
  max-height: 25rem;
  margin-top: -10px;
}
.divScroll {
  scrollbar-width: 2px !important;
  scrollbar-color: #303030 #f3f3f3;
}
</style>
