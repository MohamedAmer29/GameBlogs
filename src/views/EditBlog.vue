<template>
  <Loading v-if="success" />
  <div class="create-post">
    <div class="container">
      <div class="err-message" :class="{ invisible: !error }">
        <p><span>Error:</span> {{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input
          required
          type="text"
          placeholder="Enter Blog Title"
          v-model="useCounterStore().blogTitle"
          class="h-5 self-center"
        />
        <div class="upload-filee">
          <FileUpload
            mode="basic"
            @select="onFileSelect"
            customUpload
            accept=".png, .jpg, .jpeg"
            auto
            severity="secondary"
            style="
              background-color: #303030;
              border-radius: 20px;
              color: white;
              /* margin-left: 60px; */
              box-shadow: 0px 0px 20px 2px gray;
              border: black;
            "
            class="p-fileupload-upload-button"
          />
          <button
            class="self-center shadow-md shadow-gray-300"
            :class="{ disable: disabled }"
            id="preview"
            @click="preview = true"
            :disabled="disabled"
          >
            Preview Image
          </button>
        </div>
        <span class="self-center" id="preview"
          >File Chosen: {{ blogPhotoName }}</span
        >
      </div>
      <div class="p">
        <div
          id="imagePreview"
          v-if="preview"
          class="absolute z-10 shadow-lg shadow-gray-500 bg-gray-50 min-w-[700px] w-[80%] h-[500px] top-20 left-[5%] flex flex-col justify-center opacity-90"
        >
          <button
            @click="closeModal"
            class="absolute z-30 top-0 right-0"
            id="close"
          >
            ⓧ
          </button>
          <img
            v-if="src"
            :src="src ? String(src) : ''"
            alt="Image"
            class="shadow-md shadow-black rounded-xl w-full"
            id="image"
            style="filter: grayscale(100%)"
          />
        </div>
        <Editor
          v-model="useCounterStore().blogHtml"
          class="my-app-dark editor"
          editorStyle="height: 320px"
        />
      </div>
      <div class="succ-message" :class="{ invisible: !success }">
        <p><span>Success:</span> {{ successMsg }}</p>
      </div>
      <div class="blog-actions">
        <button class="shadow-md shadow-gray-300" @click="updatePost">
          Update Blog
        </button>
        <router-link to="/post-preview"
          ><button
            class="router-button shadow-md shadow-gray-300"
            :disabled="!active"
            :class="{ disable: !active }"
          >
            Post Preview
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileUpload from "primevue/fileupload";
import { useCounterStore } from "@/stores/counter";
import { computed, ref } from "vue";
import Editor from "primevue/editor";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db2 } from "@/firebase/firebase";
import { useRoute, useRouter } from "vue-router";
import Loading from "@/components/Loading.vue";

const currentBlog = ref<any[]>([]);
const route = useRoute();

currentBlog.value = useCounterStore().blogPosts.filter((post) => {
  //@ts-ignore
  return post.id === route.params.blogid;
});

useCounterStore().blogTitle = currentBlog.value[0].blogTitle;
useCounterStore().blogHtml = currentBlog.value[0].blogHtml;
useCounterStore().blogFileURL = currentBlog.value[0].blogUrl;
useCounterStore().blogPhotoName = currentBlog.value[0].blogPhotoName;

const preview = ref<boolean>(false);
const disabled = ref(useCounterStore().blogFileURL.length === 0);

const error = ref<boolean>(false);
const success = ref<boolean>(false);
const blogTitle = computed(() => useCounterStore().blogTitle);

const errorMsg = ref<string>("");
const successMsg = ref<string>("");
const blogFileURL = computed(() => useCounterStore().blogFileURL);
const blogHtml = computed(() => useCounterStore().blogHtml);
const blogPhotoName = computed(() => useCounterStore().blogPhotoName);

const closeModal = () => {
  preview.value = false;
};
const active = computed(() =>
  blogTitle.value !== "" && blogFileURL.value !== "" && blogHtml.value !== ""
    ? true
    : false
);
const router = useRouter();

const src = ref<string | ArrayBuffer | null>(currentBlog.value[0].blogUrl);
const updatePost = async () => {
  const washingtonRef = await doc(db2, "blogCard", currentBlog.value[0].id);
  const docSnap = await getDoc(washingtonRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  await updateDoc(washingtonRef, {
    blogHtml: blogHtml.value,
    blogUrl: blogFileURL.value,
    blogTitle: blogTitle.value,
    blogPhotoName: blogPhotoName.value,
    date: Date.now(),
  }).then(() => {
    success.value = true;
    successMsg.value = "Uploaded Succesfully!";
    useCounterStore().blogFileURL = "";
    useCounterStore().blogTitle = "";
    useCounterStore().blogPhotoName = "";
    useCounterStore().blogHtml = "";

    setTimeout(() => {
      router.push(`/view-blog/${currentBlog.value[0].id}`);
      success.value = false;
      successMsg.value = "";
    }, 2000);
  });
};

function onFileSelect(event: any) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    if (e.target) {
      src.value = e.target.result;
      useCounterStore().blogFileURL = String(src.value);

      useCounterStore().blogPhotoName = file.name;
    }
  };
  reader.readAsDataURL(file);
}
</script>

<style scoped>
@media (max-width: 750px) {
  #imagePreview {
    min-width: 300px;
    left: 10%;
  }
}
#close {
  background-color: #f9fafb;
  font: bolder;
  font-size: 25px;
  width: 65px;
  margin: auto;
  color: rgb(13, 10, 72);
  @media (max-width: 750px) {
    background-color: black;
    width: 0;
    padding: 0;
    color: white;
    right: 40px;
    top: 10px;
  }
}
#close:hover {
  opacity: 80%;
}
#preview {
  margin-top: 24px;
  padding: 10px 12px;
  margin-left: 15px;
  font: bold;
}
#image {
  width: 450px;
  margin: auto;
  @media (max-width: 750px) {
    width: 100%;
    height: 100%;
  }
}
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: white;
  }
  label,
  button,
  .router-button {
    transition: 500ms ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: white;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  .invisible {
    opacity: 0 !important;
  }
  .succ-message {
    position: fixed;
    top: 2px;

    z-index: 500;
    width: 90%;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: rgb(125, 222, 125);
    opacity: 1;
    transition: 0.5s ease all;
    p {
      color: rgb(22, 129, 93);
      font-size: 14px;
    }
    span {
      color: green;
      font-weight: 600;
    }
  }
  .err-message {
    position: fixed;
    z-index: 500;
    top: 2px;
    width: 90%;
    margin: auto !important;
    padding: 12px;
    border-radius: 8px;
    color: white;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    padding-left: 20px;
    max-width: 1000px;
    justify-content: space-between;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
      @media (max-width: 750px) {
        margin: 10px 0;
      }
    }
    @media (max-width: 750px) {
      flex-direction: column;

      padding: 4px;
      align-items: center;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
      }
    }
    .upload-filee {
      flex: 1;

      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .quill-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}

.disable {
  background-color: rgb(181, 177, 177) !important;
  cursor: not-allowed !important;
}
</style>
