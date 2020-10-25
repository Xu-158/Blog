<template>
  <div class="aboutPage p-8">
    <div class="content p-8 m-8">
      <div class="header d-flex p-8">
        <img :src="data.logo" alt="图裂了" />
        <div class="info">
          <p class="p-x-6">
            <a
              :href="
                `http://wpa.qq.com/msgrd?v=3&uin=${data.qq}&site=qq&menu=yes`
              "
              class="text-dark"
              target="_blank"
              ><img src="~@a/images/qq.png" alt="" srcset=""
            /></a>
          </p>
          <p class="p-x-6">
            <a :href="data.github" class="text-dark" target="_blank"
              ><img src="~@a/images/github.png" alt="" srcset=""
            /></a>
          </p>
        </div>
      </div>
      <div class="body p-x-6 text-font" v-html="data.contentHtml"></div>
    </div>
  </div>
</template>

<script>
import { getAboutMe } from "@api";
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.getAboutMe();
  },
  methods: {
    async getAboutMe() {
      const res = await getAboutMe();
      this.data = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.aboutPage {
  .content {
    .header {
      justify-content: space-around;
      align-items: center;
      img {
        height: 20vh;
        border-radius: 15%;
      }
      .info {
        text-align: center;
        img {
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }
    @media (max-width: 800px) {
      .header {
        flex-direction: column;
        align-items: center;
        img {
          height: 20vh;
        }
        .info {
          p {
            display: inline-block;
          }
          margin-top: 1rem;
          text-align: start;
          img {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }
  }
  .body {
    text-indent: 2rem;
    line-height: 1.7rem;
  }
}
</style>