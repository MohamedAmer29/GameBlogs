<template>
  <!-- <Loading v-if="loading" /> -->
  <div @click="useCounterStore().profileMenu = false">
    <BlogPost v-if="!useCounterStore().isLoggedIn" :post="welcomeScreen" />
    <BlogPost
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
    />
    <div class="blog-card-wrap">
      <div class="container"></div>
      <h3>View More Recent Blogs</h3>
      <div class="blog-card">
        <BlogCard
          v-for="(post, index) in sampleBlogCard"
          :key="index"
          :post="post"
        />
      </div>
    </div>
    <div class="updates" v-if="!useCounterStore().isLoggedIn">
      <div class="container shadow-md shadow-gray-200">
        <h2>Never miss a post. Register for your free acoount today!</h2>
        <router-link to="/login" class="router-button">
          Register for GameBlogs
          <img
            src="../assets/Icons/arrow-right-light.svg"
            alt="arrow image"
            class="arrow arrow-light"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogPost from "@/components/BlogPost.vue";
import BlogCard from "@/components/BlogCard.vue";
import { useCounterStore } from "@/stores/counter.ts";

import { onMounted, ref } from "vue";

const welcomeScreen = useCounterStore().welcomeScreen;
const sampleBlogPost = ref(useCounterStore().blogPostsFeed);
const sampleBlogCard = ref(useCounterStore().blogPostCards);

onMounted(async () => {
  sampleBlogCard.value = await useCounterStore().blogPostCards;
  sampleBlogPost.value = await useCounterStore().blogPostsFeed;
});
</script>
<style scoped>
@import "tailwindcss";
.blog-card-wrap {
  h3 {
    @apply font-[300] text-[20px] mb-[32px];
  }
}
.updates {
  .container {
    @apply flex flex-col items-center;
    padding: 100px 25px;
    @media (min-width: 500px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      @apply flex text-[14px];
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      text-align: center;
      width: 100%;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
