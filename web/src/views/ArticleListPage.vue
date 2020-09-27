<template>
  <div>
    <articleList :articleList="articleList"></articleList>
  </div>
</template>

<script>
import { getArticleList } from "@/api/api";
import articleList from "@/components/ArticleList.vue";
import articleTopMixin from "@/utils/articleTopMixin";
export default {
  mixins: [articleTopMixin],
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
      this.articleTopMixin(this.articleList);
    }
  },
  components: {
    articleList
  }
};
</script>

<style>
</style>