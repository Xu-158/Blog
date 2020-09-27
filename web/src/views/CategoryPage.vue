<template>
  <div class="categoryPage">
    <div class="cateBox">
      <categoryItem :tagList="tagList" @tagClick="tagItemClick"></categoryItem>
    </div>
    <articleList :articleList="articleList"></articleList>
  </div>
</template>

<script>
import categoryItem from "@/components/CategoryItem.vue";
import articleList from "@/components/ArticleList.vue";
import articleTopMixin from "@/utils/articleTopMixin";
import { getTagList, getTagArticle } from "@/api/api";
export default {
  mixins:[articleTopMixin],
  data() {
    return {
      tagList: [],
      articleList: []
    };
  },
  created() {
    this.getTagList();
  },
  methods: {
    async getTagList() {
      const res = await getTagList();
      this.tagList = res.data;
    },
    async tagItemClick(id) {
      const res = await getTagArticle({ id });
      this.articleList = res.data;
      this.articleTopMixin(this.articleList);
    }
  },
  components: { categoryItem, articleList }
};
</script>

<style lang="scss" scoped>
.categoryPage {
  padding: 2rem;
  .cateBox {
    padding: 2rem;
    border: 1px solid rgb(151, 151, 151);
  }
}
</style>