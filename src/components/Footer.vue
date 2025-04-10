<template>
  <div>
    <footer>
      <div class="container">
        <div class="left">
          <div class="col-1">
            <router-link class="header" to="/">GameBlogs</router-link>
            <ul>
              <li>
                <a href="https://www.youtube.com/"
                  ><img
                    src="../assets/Icons/youtube-brands.svg"
                    alt="youtube link"
                    class="svg-icon"
                    :class="{ dark: useCounterStore().isDark }"
                /></a>
              </li>
              <li>
                <a href="https://x.com/"
                  ><img
                    src="../assets/Icons/twitter-brands.svg"
                    alt="twitter link"
                    class="svg-icon"
                    :class="{ dark: useCounterStore().isDark }"
                /></a>
              </li>
              <li>
                <a href="https://www.instagram.com/"
                  ><img
                    src="../assets/Icons/instagram-brands.svg"
                    alt="instagram link"
                    class="svg-icon"
                    :class="{ dark: useCounterStore().isDark }"
                /></a>
              </li>

              <li>
                <a href="https://www.linkedin.com/"
                  ><img
                    src="../assets//Icons/linkedin-brands.svg"
                    alt="linkedin link"
                    class="svg-icon"
                    :class="{ dark: useCounterStore().isDark }"
                /></a>
              </li>
            </ul>
          </div>
          <div class="col-2">
            <ul>
              <router-link class="link" to="/">Home</router-link>
              <router-link class="link" to="/blogs">Blogs</router-link>
              <router-link
                class="link text-[#088DA5]"
                to="/create-post"
                v-if="useCounterStore().isAdmin"
                >Create Post</router-link
              >
              <router-link
                class="link text-[#088DA5]"
                v-if="!useCounterStore().isLoggedIn"
                to="/login"
                >Login In / Register</router-link
              >
            </ul>
          </div>
        </div>
        <div class="right">
          <p>Copyright 2025 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
</script>

<style scoped>
footer {
  margin-top: 0px;
  padding: 20px;
  padding-bottom: 5px;
  height: fit-content;
  box-shadow: 2px 0 10px 3px gray;
  .container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }
      .dark {
        filter: brightness(0) invert(1) !important;
      }
      .header {
        text-align: center;
        font-size: 26px;
        margin-top: 4px;
        margin-bottom: 8px;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }
      ul {
        gap: 20px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }
        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;
            .svg-icon {
              width: 24px;
              height: auto;
              &:hover {
                opacity: 80%;
              }
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
          .link {
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 32px;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
