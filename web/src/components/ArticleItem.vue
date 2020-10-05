<template>
  <div v-if="articleObj">
    <div class="articleBox" @click="boxClick(articleObj._id)">
      <div class="article">
        <div class="title fs-xl p-7 m-b-3 text-title">
          <span class="itemTop text-red fs-xxs p-2" v-if="articleObj.isTop"
            >TOP</span
          ><span v-else>∵</span>
          {{ articleObj.title }}
        </div>
        <div class="articleContnet text-font" v-html="articleObj.contentHtml"></div>
      </div>
      <div class="flex-1">
        <div class="m-l-7 p-t-8 fs-lg articleAction">
          <div class="fs-xs m-b-7">
            &#128064; &nbsp;&nbsp;&nbsp;{{ articleObj.hitCount }}
          </div>
          <div class="fs-sm text-red">
            &#10084; &nbsp;&nbsp;&nbsp;{{ articleObj.likeCount }}
          </div>
        </div>
      </div>
      <div class="d-flex flex-column jc-between">
        <img :src="articleObj.thumbnail" alt="图裂开了" width="100%" />
      </div>
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
  border-radius: 1rem;
  background-color: map-get($colors, "articleBox");
  &:hover {
    background-color: map-get($colors, "articleBoxArticle");
  }
  .article {
    flex: 8;
    height: 20vh;
    overflow: hidden;
    .title {
      font-weight: 600;
      letter-spacing: 0.3rem;
      line-height: 2rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      .itemTop {
        vertical-align: middle;
        border: 2px solid map-get($colors, "red");
        letter-spacing: 0.1rem;
        line-height: 1.5rem;
        border-radius: 1rem;
      }
    }
    .articleContnet {
      /* 多行超出省略的必备条件 */
      display: -webkit-box; /* 弹性盒模型 */
      -webkit-box-orient: vertical; /* 元素垂直居中*/
      -webkit-line-clamp: 4; /*  文字显示的行数*/
      overflow: hidden; /* 超出隐藏 */
      text-indent: 2rem;
      letter-spacing: 0.2rem;
    }
  }
  img {
    flex: 4;
    width: 10vw;
    max-height: 25vh;
  }
  .articleAction {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  @media (max-width: 1024px) {
    img {
      width: 25vw;
      height: auto;
    }
    .articleAction {
      display: none;
    }
  }
}
@media (max-width: 1024px) {
  .articleBox {
    height: 20vh;
  }
}
</style>