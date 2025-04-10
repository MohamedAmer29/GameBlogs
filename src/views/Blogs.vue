<template>
  <div class="blog-card-wrap">
    <div class="blog-card container">
      <div class="toggle-edit" v-if="useCounterStore().isAdmin">
        <span>Toggle Editing Post</span>
        <input
          type="checkbox"
          class="enabled"
          @click="useCounterStore().togglePost"
        />
      </div>
      <BlogCard v-for="post in sampleBlogCard" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import BlogCard from "@/components/BlogCard.vue";
import { useRoute } from "vue-router";
const sampleBlogCard: Array<any> = useCounterStore().blogPosts;
const route = useRoute();
</script>

<style scoped>
@import "tailwindcss";
.blog-card {
  @apply relative;
}
.toggle-edit {
  @apply flex items-center absolute top-[-70px] right-0;
}
span {
  margin-right: 16px;
}
input[type="checkbox"] {
  @apply relative bg-white outline-none w-[80px] h-[30px] rounded-[20px];
  -webkit-appearance: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 wpx 4px -1px rgba(0, 0, 0, 0.06);
}
input[type="checkbox"]::before {
  content: "";
  @apply absolute w-[30px] h-[30px] rounded-[20px] top-0 left-0 bg-[#303030];
  transform: scale(1.1);
  transition: 750ms ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 wpx 4px -1px rgba(0, 0, 0, 0.06);
}
input:checked[type="checkbox"]::before {
  @apply bg-white left-[52px];
}
</style>
