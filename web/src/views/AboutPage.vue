<template>
  <div class="aboutPage p-8">
    <div class="content p-8 m-8">
      <div class="header d-flex p-8">
        <img :src="data.logo" alt="图裂了" />
        <div class="info">
          <p>QQ:{{ data.qq }}</p>
          <p>{{ data.e_mail }}</p>
          <p><a :href="data.github" class="text-dark" target="_blank">Github</a></p>
        </div>
      </div>
      <div class="body p-8 text-font" v-html="data.contentHtml"></div>
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
    border: 1px dashed #666;
    .header {
      justify-content: space-around;
      img {
        height: 10rem;
      }
      .info {
        text-align: end;
        // flex: 4;
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