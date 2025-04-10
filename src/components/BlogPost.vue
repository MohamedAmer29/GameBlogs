<template>
  <div
    class="blog-wrapper"
    :class="{ 'no-user': !useCounterStore().isLoggedIn }"
  >
    <div class="blog-content">
      <div>
        <h2 v-if="prop.post.welcomeScreen">
          {{ prop.post.title }}
        </h2>

        <h2 v-else>{{ prop.post.blogTitle }}</h2>
        <p v-if="prop.post.welcomeScreen">
          {{ prop.post.blogPost }}
        </p>
        <p class="content-preview" v-else v-html="prop.post.blogHtml"></p>
        <RouterLink
          to="/login"
          v-if="post.welcomeScreen"
          class="link link-light"
          >Login/Register
          <img
            src="../assets/Icons/arrow-right-light.svg"
            alt="arrow image"
            class="arrow arrow-light"
          />
        </RouterLink>
        <RouterLink :to="`view-blog/${post.id}`" v-else class="link"
          >View the Post
          <img
            src="../assets/Icons/arrow-right-light.svg"
            alt="arrow image"
            class="arrow"
        /></RouterLink>
      </div>
    </div>
    <div class="blog-photo">
      <img
        src="https://i.ibb.co/WNJ7qK2w/games.jpg"
        alt="coding"
        border="0"
        v-if="prop.post.welcomeScreen"
      />
      <img :src="getImageUrl(prop.post.blogUrl)" v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import getImageUrl from "./getImage";
import { defineProps } from "vue";

const prop = defineProps(["post"]);
</script>

<style scoped>
@import "tailwindcss";
.no-user:first-child {
  .blog-content {
    @apply bg-[#303030] text-white;
  }
}
.blog-wrapper {
  @apply flex flex-col shadow-lg;
}
.blog-content {
  @apply flex flex-col justify-center items-center order-2;
  flex: 4;
}
.blog-content div {
  @apply max-w-[375px] py-[72px] px-[24px];
}
.blog-content h2 {
  @apply text-3xl text-gray-700 font-light uppercase  mb-[24px];
}
.blog-content p {
  @apply text-[15px] font-light;
  line-height: 1.7;
}
.content-preview {
  @apply text-[13px] max-h-[24px] w-[250px] whitespace-nowrap overflow-hidden text-ellipsis;
}
.link {
  display: inline-flex;
  align-items: center;
  margin-top: 32px;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease-in all;
}
.link:hover {
  border-bottom-color: #303030;
}
.link-light:hover {
  border-block-color: white;
}
.blog-photo {
  order: 1;
  flex: 3;
  box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.1) 0 2px 4px -1px
    rgba(0, 0, 0, 0.06);
}
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.link-light {
  color: #fff;
}
.blog-wrapper:nth-child(even) {
  .blog-content {
    order: 2;
  }
  .blog-photo {
    order: 1;
  }
}
.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}
@media (min-width: 700px) {
  .blog-wrapper {
    @apply min-h-[650px] max-h-[650ox] flex-row;
  }
  .blog-content {
    order: 1;
  }
  .blog-content div {
    padding: 0 24px;
  }
  .blog-content h2 {
    font-size: 40px;
  }
  .blog-photo {
    order: 2;
  }
}
@media (min-width: 800px) {
  .blog-content {
    flex: 3;
  }
  .blog-photo {
    flex: 4;
  }
}
</style>
