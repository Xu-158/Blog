<template>
  <div v-if="articleObj">
    <div class="articleBox" @click="boxClick(articleObj._id)">
      <div class="article">
        <div class="title fs-xl p-7 m-b-3 text-title">
          <span>∵</span><span class="itemTop text-red fs-xxs p-x-7" v-if="articleObj.isTop">TOP</span>
          {{ articleObj.title }}
        </div>
        <div
          class="articleContnet text-font"
          v-html="articleObj.contentHtml"
        ></div>
      </div>
      <div class="flex-1"></div>
      <img :src="articleObj.thumbnail" alt="图裂开了" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    boxClick(id) {
      this.$router.push(`/article/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/_variables.scss";
.articleBox {
  width: 100%;
  height: 30vh;
  margin-bottom: 1rem;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  background-color: map-get($colors, "articleBox");
  &:hover {
    background-color: map-get($colors, "articleBoxArticle");
  }
  .article {
    flex: 8;
    height: 20vh;
    overflow: hidden;
    text-overflow: ellipsis;
    .title {
      font-weight: 600;
      letter-spacing: 0.3rem;
      line-height: 2rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      .itemTop{
        display: inline-block;
        border: 1px solid map-get($colors, 'red');
        border-radius: 1rem;
      }
    }
    .articleContnet {
      text-indent: 2rem;
      letter-spacing: 0.2rem;
    }
  }
  img {
    flex: 4;
    width: 10vw;
    max-height: 25vh;
  }
  @media (max-width: 1024px) {
    img {
      flex: 7;
      width: 15vw;
      height: 15vh;
    }
  }
}
</style>