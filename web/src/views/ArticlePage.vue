<template>
  <div class="article">
    <articleDirectory
      :directoryList="directoryList"
      class="directory"
      v-if="showDirectory"
    ></articleDirectory>
    <h2>{{ article.title }}</h2>
    <h4>
      {{ article.createdAt }}
      <span class="m-l-8 fs-lg text-footer fs-xs"
        >&#128064;{{ article.hitCount }}</span
      >
    </h4>
    <div class="logo"><img :src="article.thumbnail" alt="" /></div>
    <v-md-preview
      class="previewMd"
      :include-level="[3, 4]"
      :text="article.contentMd"
      ref="previewMd"
    ></v-md-preview>
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
import { getArticleInfo, likeCountAdd } from "@api";
import dateFormat from "@u/dateFormat.js";
import ArticleDirectory from "@c/ArticleDirectory";
// import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export default {
  name: "articlePage",
  components: { ArticleDirectory },
  props: {
    id: { type: String }
  },
  data() {
    return {
      article: {},
      likeFlag: false,
      directoryList: [],
      showDirectory: false
    };
  },
  created() {
    this.getArticleInfo();
  },
  mounted() {
    this.getHTag();
    this.initDirectory();
    window.addEventListener("resize", this.initDirectory);
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name == "articlePage") this.showDirectoryBtn = true;
    next();
  },
  methods: {
    initDirectory() {
      this.showDirectory = window.innerWidth < 1024 ? false : true;
    },
    getHTag() {
      this.$nextTick(function() {
        setTimeout(() => {
          let a = document
            .querySelector(".previewMd")
            .querySelectorAll("h1,h2,h3,h4,h5,h6");
          console.log(a);
          a.forEach(e => {
            let obj = {
              offsetTop: e.offsetTop,
              title: e.innerHTML,
              level: parseInt(e.tagName.slice(1))
            };
            this.directoryList.push(obj);
          });
          console.log("this.directoryList: ", this.directoryList);
        }, 200);
      });
    },
    async getArticleInfo() {
      const res = await getArticleInfo({ id: this.id });
      if (!res.data) {
        this.$router.push("/notFound");
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
  background-color: rgba(255, 255, 255, 0.596);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 2rem;
  .content {
    line-height: 2rem;
  }
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
  .directory {
    position: fixed;
    top: 100px;
    right: 20px;
  }
}
</style>