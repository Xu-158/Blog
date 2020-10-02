<template>
  <div class="article">
    <h2>{{ article.title }}</h2>
    <h4>{{ article.createdAt }}</h4>
    <div><img :src="article.thumbnail" alt=""  width="100%"/></div>
    <div v-html="article.contentHtml"></div>
    <button class="text-red fs-xll m-y-8" @click="likeClick">
      <span class="p-x-5">&#10084;</span> <span>{{ article.likeCount }}</span>
    </button>
  </div>
</template>

<script>
import { getArticleInfo, likeCountAdd } from "@/api/api";
import dateFormat from "@/utils/dateFormat.js";
export default {
  name: "articlePage",
  props: {
    id: { type: String }
  },
  data() {
    return {
      article: {}
    };
  },
  created() {
    this.getArticleInfo();
  },
  methods: {
    async getArticleInfo() {
      const res = await getArticleInfo({ id: this.id });
      this.article = res.data;
      this.article.createdAt = dateFormat(
        "YYYY-mm-dd HH:MM:SS",
        new Date(this.article.createdAt)
      );
    },
    async likeClick() {
      if (this.article) {
        const res = await likeCountAdd({
          id: this.article._id,
          likeCount: this.article.likeCount
        });
        this.article.likeCount = res.data.likeCount;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  button {
    border: none;
    background-color: rgba(252, 252, 252, 0);
  }
}
</style>