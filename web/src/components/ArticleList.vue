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
export default {
  props: {
    articleList: {
      type: Array,
      required: true
    }
  },

  components: {
    articleItem
  }
};
</script>

<style lang="scss" scoped>
</style>