<template>
  <div class="aboutPage p-8">
    <div class="content p-8 m-8">
      <div class="header d-flex p-8 flex-column">
        <img :src="data.logo" alt="图裂了" />
        <div class="info">
          <span class="p-x-6">
            <a
              :href="
                `http://wpa.qq.com/msgrd?v=3&uin=${data.qq}&site=qq&menu=yes`
              "
              class="text-dark"
              target="_blank"
              ><img src="~@a/images/qq.png" alt="" srcset=""
            /></a>
          </span>
          <span class="p-x-6">
            <a :href="data.github" class="text-dark" target="_blank"
              ><img src="~@a/images/github.png" alt="" srcset=""
            /></a>
          </span>
        </div>
      </div>
      <div class="body p-6 text-font" v-html="data.contentHtml"></div>
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
      justify-content: center;
      align-items: center;
      .info {
        text-align: center;
        img {
          width: 2rem;
          height: 2rem;
        }
      }
    }
    @media (max-width: 800px) {
      .header {
        flex-direction: column;
        align-items: center;
        img {
          width: 60vw;
          height: 20rem;
        }
        .info {
          margin-top: 1rem;
          text-align: start;
        }
      }
    }
  }
  .body {
    text-indent: 2rem;
    line-height: 1.5rem;
  }
}
</style>