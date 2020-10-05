<template>
  <div v-if="tagList">
    <div
      class="cateItem p-x-8 p-y-5 m-r-8 m-b-8 m-t-3 fs-lg"
      v-for="(tagItem, index) in tagList"
      :key="tagItem._id"
      @click="tagClick(tagItem._id, index)"
      :class="{ active: index == activeIndex }"
    >
      {{ tagItem.title }}
      <i class="cateItemCount p-x-5 fs-xxs text-font">{{
        getArticleCount(index)
      }}</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0
    };
  },
  props: {
    tagList: {
      type: Array,
      required: true
    }
  },
  methods: {
    tagClick(id, index) {
      this.$emit("tagClick", id);
      this.activeIndex = index;
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
@import "../assets/style/_variables.scss";
.cateItem {
  position: relative;
  display: inline-block;
  border: 1px solid #999;
  border-radius: 5px;
  color: map-get($colors, "font");
  font-weight: 600;
  &:hover {
    transition: all 1s;
    transform: translateX(5px);
    color: white;
    font-weight: 600;
    border: 1px solid #fff;
    background-color: map-get($colors, "articleBoxArticle");
  }
  .cateItemCount {
    position: absolute;
    display: inline-block;
    border: 1px solid #999;
    border-radius: 50%;
    right: 0rem;
    bottom: -1rem;
  }
}
.active {
  color: white;
  border: 1px solid #fff;
  background-color: map-get($colors, "articleBoxArticle");
  .cateItemCount {
    color: white;
    background-color: map-get($colors, "articleBoxArticle");
    position: absolute;
    display: inline-block;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 50%;
    bottom: -1rem;
  }
}
</style>