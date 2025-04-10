<template>
  <div class="blog-card">
    <div class="icons" v-if="!editPost && useCounterStore().isAdmin">
      <div class="icon bg-white" @click="editBlog">
        <img
          src="../assets/Icons/edit-regular.svg"
          alt="edit image"
          class="edit"
        />
      </div>
      <div class="icon bg-white" @click="deletePost">
        <img
          src="../assets/Icons/trash-regular.svg"
          alt="delete image"
          class="delete"
        />
      </div>
    </div>
    <img :src="getImageUrl(prop.post.blogUrl)" />
    <div class="info">
      <h4>
        {{ prop.post.blogTitle }}
      </h4>
      <h6>
        posted in:
        {{
          new Date(prop.post.date).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h6>
      <router-link class="link" :to="`/view-blog/${prop.post.id}`"
        >View The Post
        <img
          src="../assets//Icons/arrow-right-light.svg"
          alt="arrow icon"
          class="arrow"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { doc, deleteDoc } from "firebase/firestore";
import getImageUrl from "./getImage";
import { defineProps, computed } from "vue";
import { db2 } from "@/firebase/firebase";
import { useRouter } from "vue-router";
const prop = defineProps(["post"]);
const router = useRouter();
const editPost = computed(() => {
  return useCounterStore().editPost;
});
const deletePost = async () => {
  await deleteDoc(doc(db2, "blogCard", prop.post.id));
  await location.reload();
};
const editBlog = () => {
  router.push(`edit-blog/${prop.post.id}`);
};
</script>

<style scoped>
@import "tailwindcss";
.blog-card {
  @apply relative cursor-pointer flex flex-col rounded-[8px] bg-gray-100 shadow-xl shadow-gray-300 min-h-[420px] transition-all ease-initial duration-500;
  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) 0 2px 4px -1px
      rgba(0, 0, 0, 0.06);
  }
  .icons {
    @apply flex absolute top-[10px] right-[10px] z-[99];
    .icon {
      @apply flex justify-center items-center w-[35px] h-[35px] rounded-full duration-500 transition-all ease-initial;
      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }
      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }
  img {
    @apply block z-[1] w-[100%] object-cover;
    border-radius: 8px 8px 0 0;
  }
  .info {
    @apply flex flex-col h-full z-[3] text-black;
    padding: 32px 16px;
    h4 {
      @apply pb-[8px] text-[20px] font-[300];
    }
    h6 {
      @apply font-[400] text-[12px] pb-4;
    }
    .link {
      @apply inline-flex items-center mt-auto font-[500] pt-[20px] text-[12px] pb-1 transition-all ease-in duration-500;
      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }
      .arrow {
        margin-left: 6px;
        width: 10px;
      }
    }
  }
}
</style>
