<template>
  <div class="categoryPage">
    <div class="cateBox">
      <categoryItem :tagList="tagList" @tagClick="tagItemClick"></categoryItem>
    </div>
    <articleList v-if="articleList" :articleList="articleList"></articleList>
    <pagination
      :totalSize="totalSize"
      :currentPage="currentPage"
      :onePageSize="onePageSize"
      @pageChange="pageChange"
    ></pagination>
  </div>
</template>

<script>
import categoryItem from "@/components/CategoryItem.vue";
import articleList from "@/components/ArticleList.vue";
import pagination from "@/components/Pagination.vue";
import { getTagList, getTagArticle } from "@/api/api";
export default {
  data() {
    return {
      tagList: [],
      articleList: [],
      totalSize: 0,
      currentPage: 0,
      onePageSize: 4
    };
  },
  created() {
    this.getTagList();
  },
  methods: {
    async getTagList() {
      const res = await getTagList();
      this.tagList = res.data;
      if (this.tagList.length) {
        this.tagItemClick(this.tagList[0]._id);
      }
    },
    async tagItemClick(id) {
      const res = await getTagArticle({
        id,
        page: this.currentPage,
        pageSize: this.onePageSize
      });
      this.articleList = res.data.articleList;
      this.totalSize = res.data.totlaSize;
    },
    pageChange(index) {
      this.currentPage = index;
      this.initArticle();
    }
  },
  components: { categoryItem, articleList, pagination }
};
</script>

<style lang="scss" scoped>
.categoryPage {
  padding: 2rem;
  .cateBox {
    padding: 2.5rem;
  }
}
</style>
