<template>
  <div>
    <articleList :articleList="articleList"></articleList>
    <pagination
      :totalSize="totalSize"
      :currentPage="currentPage"
      :onePageSize="onePageSize"
      @pageChange="pageChange"
    ></pagination>
  </div>
</template>

<script>
import { getArticleList } from "@/api/api";
import articleList from "@/components/ArticleList.vue";
import pagination from "@/components/Pagination.vue";
import articleTopMixin from "@/utils/articleTopMixin";
export default {
  mixins: [articleTopMixin],
  data() {
    return {
      articleList: [],
      totalSize: 0,
      currentPage: 0,
      onePageSize: 4
    };
  },
  created() {
    this.initArticle();
  },
  methods: {
    async initArticle() {
      const res = await getArticleList({
        page: this.currentPage,
        pageSize: this.onePageSize
      });
      this.articleList = res.data.articleList;
      this.totalSize = res.data.totlaSize;
      this.articleTopMixin(this.articleList);
    },
    pageChange(index) {
      this.currentPage = index;
      this.initArticle();
    }
  },
  components: {
    articleList,
    pagination
  }
};
</script>
