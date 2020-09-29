<template>
  <div v-if="tagList">
    <div
      class="cateItem p-x-6 p-y-3 m-r-8 m-b-8 m-t-3"
      v-for="(tagItem, index) in tagList"
      :key="tagItem._id"
      @click="tagClick(tagItem._id, index)"
      :class="{ active: index == activeIndex }"
    >
      {{ tagItem.title }}
      <i class="cateItemCount p-x-3 fs-xxs text-font">{{
        getArticleCount(index)
      }}</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null
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
.cateItem {
  position: relative;
  display: inline-block;
  border: 1px solid #999;
  border-radius: 5px;
  &:hover {
    color: rgb(34, 120, 178);
    font-weight: 600;
    border: 1px solid #fff;
    background-color: rgb(255, 255, 255);
  }
  .cateItemCount {
    position: absolute;
    display: inline-block;
    border: 1px solid #999;
    border-radius: 50%;
    bottom: -1rem;
  }
}
.active {
  color: rgb(34, 120, 178);
  font-weight: 600;
  border: 1px solid #fff;
  background-color: rgb(255, 255, 255);
  .cateItemCount {
    color: rgb(34, 120, 178);
    background-color: rgb(255, 255, 255);
    position: absolute;
    display: inline-block;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 50%;
    bottom: -1rem;
  }
}
</style>