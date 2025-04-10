import { db2 } from "@/firebase/firebase";

import { where, getDocs, query, collection, orderBy } from "firebase/firestore";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("useStore", {
  state: () => {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things Games.Register today to never miss a post!",
        welcomeScreen: true,
        photo: "../assets/blogPhotos/games.jpg",
      },
      blogHtml: "Write your blog title here...",
      blogTitle: "",
      blogPhotoName: "",
      blogFileURL: "",
      blogPhotoPreview: "",
      editPost: false,
      user: null,
      profileEmail: null,
      profileFirstName: null,
      profileLastName: null,
      profileUserName: null,
      profileId: null,
      profileInitials: "",
      isLoggedIn: false,
      profileMenu: false,
      mobileNav: false,
      isAdmin: false,
      collectionId: localStorage.getItem("isLoginFormSent"),
      isDark: false,
      blogPosts: [],
      postLoaded: false,
    };
  },
  getters: {
    //@ts-ignore
    async blogPostsFeed(): object | undefined {
      return await this.blogPosts.slice(0, 2);
    },
    //@ts-ignore
    async blogPostCards(): object | undefined {
      return await this.blogPosts.slice(2, 6);
    },
  },
  actions: {
    togglePost() {
      this.editPost = !this.editPost;
    },

    async getUserInfo(id: string | null | undefined) {
      if (typeof id === "string") {
        const q = query(
          collection(db2, "users"),

          where("id", "==", id)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          this.user = doc.data().user;
          this.profileEmail = doc.data().email;
          this.profileFirstName = doc.data().firstName;
          this.profileLastName = doc.data().lastName;
          this.profileUserName = doc.data().username;
          this.profileId = doc.data().id;
          this.isAdmin = doc.data().admin;
        });
      }
      if (
        typeof this.profileFirstName === "string" &&
        typeof this.profileLastName === "string"
      ) {
        const firstName = this.profileFirstName as string;
        const lastName = this.profileLastName as string;
        this.profileInitials =
          firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
      }
    },

    async getPost() {
      interface datatype {
        blogTitle: string;
        blogHtml: string | undefined;
        id: string;
        date: string;
        blogUrl: string;
        blogPhotoName: string;
      }
      const querySnapshot = await collection(db2, "blogCard");
      const q = query(querySnapshot, orderBy("date"));

      const get = await getDocs(q);
      get.forEach((doc) => {
        const data: datatype = {
          id: doc.id as string,
          blogTitle: doc.data().blogTitle,
          blogHtml: doc.data().blogHtml as string,
          blogUrl: doc.data().blogUrl as string,
          date: doc.data().date as string,
          blogPhotoName: doc.data().blogPhotoName as string,
        };
        //@ts-ignore
        this.blogPosts.push(data);
      });
      this.postLoaded = true;
    },
  },
});
