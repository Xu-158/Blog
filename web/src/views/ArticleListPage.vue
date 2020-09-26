<template>
  <div>
    <articleItem
      v-for="article in articleList"
      :key="article._id"
      :articleObj="article"
    ></articleItem>
  </div>
</template>

<script>
import articleItem from "@/components/ArticleItem.vue";
import { getArticleList } from "@/api/api";
export default {
  data() {
    return {
      articleList: []
    };
  },
  created() {
    this.initArticle();
  },
  methods: {
    async initArticle() {
      const res = await getArticleList();
      this.articleList = res.data;
      console.log(this.articleList);
    }
  },
  components: {
    articleItem
  }
};
</script>

<style lang="scss" scoped>
</style>