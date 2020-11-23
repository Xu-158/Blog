<template>
  <div v-if="articleList">
    <my-transition-group name="rightToLeft">
      <div
        v-for="articleObj in articleList"
        :key="articleObj._id"
        class="rightToLeft"
      >
        <div class="articleBox" @click="boxClick(articleObj._id)">
          <div class="itemTop" v-if="articleObj.isTop">TOP</div>
          <div class="article">
            <div class="title fs-xll p-7 m-b-3 text-title">
              {{ articleObj.title }}
            </div>
            <div
              class="articleContnet text-font"
              v-html="articleObj.contentHtml"
            ></div>
          </div>
          <div class="m-l-7 p-t-8 fs-lg articleAction">
            <div class="fs-xs m-b-7">
              &#128064; &nbsp;&nbsp;&nbsp;{{ articleObj.hitCount }}
            </div>
            <div class="fs-sm text-red">
              &#10084; &nbsp;&nbsp;&nbsp;{{ articleObj.likeCount }}
            </div>
          </div>
          <img
            v-if="!isMobile"
            :src="articleObj.thumbnail"
            alt="图裂开了"
            width="100%"
          />
        </div>
      </div>
    </my-transition-group>
  </div>
</template>

<script>
import MyTransitionGroup from "@c/MyTransitionGroup";
import debounce from "@u/debounce";
export default {
  props: {
    articleList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this._isMobile();
    window.addEventListener("resize", debounce(this._isMobile, 200));
    this.$once("hook:destroyed", () => {
      window.removeEventListener("resize", debounce(this._isMobile, 200));
    });
  },
  methods: {
    boxClick(id) {
      this.$router.push(`/article/${id}`);
    },
    _isMobile() {
      this.isMobile = window.innerWidth < 800 ? true : false;
      if (this.isMobile) this.showMobileNavItem = false;
    },
  },
  components: { MyTransitionGroup },
};
</script>

<style lang="scss" scoped>
.article-list-enter-active,
.article-list-leave-active {
  transition: all 0.3s;
  opacity: 0;
  position: relative;
  left: 0;
}
.article-list-enter,
.article-list-leave-to {
  opacity: 1;
  left: 500px;
}

.articleBox {
  position: relative;
  padding: 2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 1rem;
  background-color: map-get($colors, "articleBox");
  overflow: hidden;
  &:hover {
    background-color: map-get($colors, "articleBoxActive");
    box-shadow: 4px 4px 4px #666;
  }
  .itemTop {
    position: absolute;
    top: 1rem;
    left: -1.6rem;
    height: 1.2rem;
    width: 7rem;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg); /* IE 9 */
    -moz-transform: rotate(-45deg); /* Firefox */
    -webkit-transform: rotate(-45deg); /* Safari 和 Chrome */
    -o-transform: rotate(-45deg);
    background-color: map-get($colors, "red");
    text-align: center;
    box-shadow: -2px 2px 5px #666;
    color: #fff;
    font-weight: 600;
  }
  .article {
    flex: 7;
    height: 20vh;
    overflow: hidden;
    .title {
      display: inline-block;
      padding-left: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.3rem;
      line-height: 2rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    .articleContnet {
      /* 多行超出省略的必备条件 */
      display: -webkit-box; /* 弹性盒模型 */
      -webkit-box-orient: vertical; /* 元素垂直居中*/
      -webkit-line-clamp: 4; /*  文字显示的行数*/
      overflow: hidden; /* 超出隐藏 */
      text-indent: 2rem;
      letter-spacing: 0.2rem;
      line-height: 2rem;
    }
  }
  img {
    flex: 3;
    width: 10vw;
    max-height: 25vh;
  }
  .articleAction {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  @media (max-width: 1024px) {
    img {
      width: 30vw;
      height: auto;
    }
    .articleAction {
      display: none;
    }
  }
}
</style>