<template>
  <div v-if="tagList">
    <div
      class="cateItem p-x-6 p-y-3 m-r-8 m-b-8"
      v-for="(tagItem, index) in tagList"
      :key="tagItem._id"
      @click="tagClick(tagItem._id)"
    >
      {{ tagItem.title }}
      <i class="cateItemCount p-x-3 fs-xxs">{{ getArticleCount(index) }}</i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tagList: {
      type: Array,
      required: true
    }
  },
  methods: {
    tagClick(id) {
      this.$emit('tagClick',id)
    }
  },
  computed: {
    getArticleCount() {
      return index => {
        return this.tagList[index].selectArticles.length;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.cateItem {
  position: relative;
  display: inline-block;
  border: 1px solid #999;
}
.cateItemCount {
  position: absolute;
  display: inline-block;
  border: 1px solid #999;
  border-radius: 50%;
  bottom: -1rem;
}
</style>