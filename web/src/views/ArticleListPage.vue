<template>
  <div>
    <articleItem @pushArticlePage="pushArticlePage"></articleItem>
    <articleItem @pushArticlePage="pushArticlePage"></articleItem>
    <articleItem @pushArticlePage="pushArticlePage"></articleItem>
  </div>
</template>

<script>
import articleItem from "@/components/ArticleItem.vue";
export default {
  components: {
    articleItem
  },
  methods: {
    pushArticlePage(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>