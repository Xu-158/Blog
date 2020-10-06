<template>
  <div class="article">
    <h2>{{ article.title }}</h2>
    <h4>
      {{ article.createdAt }}
      <span class="m-l-8 fs-lg text-footer fs-xs"
        >&#128064;{{ article.hitCount }}</span
      >
    </h4>
    <div><img :src="article.thumbnail" alt="" width="100%" /></div>
    <div v-html="article.contentHtml" class=""></div>
    <button
      class="fs-xll m-y-8"
      :class="{ likeActive: likeFlag }"
      @click="likeClick"
    >
      <span class="p-x-5">&#10084;</span> <span>{{ article.likeCount }}</span>
    </button>
  </div>
</template>

<script>
import { getArticleInfo, likeCountAdd } from "@/api/api";
import dateFormat from "@/utils/dateFormat.js";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export default {
  name: "articlePage",
  props: {
    id: { type: String }
  },
  data() {
    return {
      article: {},
      likeFlag: false
    };
  },
  created() {
    this.getArticleInfo();
  },
  methods: {
    async getArticleInfo() {
      const res = await getArticleInfo({ id: this.id });
      console.log(res.data);
      if(!res.data){
        this.$router.push("/notFound")
      }
      this.article = res.data;
      this.article.createdAt = dateFormat(
        "YYYY-mm-dd HH:MM:SS",
        new Date(this.article.createdAt)
      );
      this.highlighthandle();
    },
    async likeClick() {
      if (this.article && !this.likeFlag) {
        const res = await likeCountAdd({
          id: this.article._id,
          likeCount: this.article.likeCount
        });
        this.article.likeCount = res.data.likeCount;
        this.likeFlag = true;
      }
    },
    async highlighthandle() {
      await hljs;
      let highlight = document.querySelectorAll("code,pre");
      highlight.forEach(block => {
        hljs.highlightBlock(block);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 2rem;
  button {
    border: none;
    background-color: rgba(252, 252, 252, 0);
  }
  .likeActive {
    transition: color 1s;
    color: rgb(236, 5, 5);
    animation: active 1s linear;
  }
  @keyframes active {
    0% {
      font-size: 1.2rem;
      transform: rotateY(0deg);
      transform: rotateZ(0deg);
    }
    20% {
      font-size: 1.35rem;
      transform: rotateY(90deg);
      transform: rotateZ(90deg);
    }
    30% {
      font-size: 1.4rem;
      transform: rotateY(80deg);
      transform: rotateZ(80deg);
    }
    40% {
      font-size: 1.4rem;
      transform: rotateY(90deg);
      transform: rotateZ(90deg);
      transform: scaleX(90deg);
    }
    50% {
      font-size: 1.45rem;
      transform: rotateY(180deg);
      transform: rotateZ(180deg);
    }
    70% {
      font-size: 1.65rem;
      transform: rotateY(270deg);
      transform: rotateZ(270deg);
    }
    90% {
      font-size: 1.8rem;
      transform: rotateY(360deg);
      transform: rotateZ(360deg);
    }
    95% {
      font-size: 2.1rem;
      transform: rotateY(350deg);
      transform: rotateZ(350deg);
    }
    100% {
      font-size: 1.8rem;
      transform: rotateY(360deg);
      transform: rotateZ(360deg);
    }
  }
}
</style>