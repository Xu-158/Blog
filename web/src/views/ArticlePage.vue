<template>
  <div>
    <h2>{{article.title}}</h2>
    <div v-html="article.contentHtml"></div>
  </div>
</template>

<script>
import { getArticleInfo } from "@/api/api";
export default {
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
      const res = await getArticleInfo({id:this.id});
      this.article = res.data;
    }
  }
};
</script>

<style>
</style>