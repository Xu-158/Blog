<template>
  <div class="article">
    <articleDirectory
      :directoryList="directoryList"
      class="directory"
      v-show="showDirectory"
    ></articleDirectory>
    <div class="articleHeader">
      <h2>{{ article.title }}</h2>
      <h4>
        {{ article.createdAt }}
        <span class="m-l-8 fs-lg text-footer fs-xs"
          >&#128064;{{ article.hitCount }}</span
        >
      </h4>
      <div class="logo"><img :src="article.thumbnail" alt="" /></div>
    </div>
    <v-md-preview
      class="previewMd"
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

import debounce from "@u/debounce";

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
    window.addEventListener("resize", debounce(this.initDirectory, 200));
  },
  methods: {
    initDirectory() {
      this.showDirectory = window.innerWidth < 1024 ? false : true;
    },
    getHTag() {
      this.$nextTick(function() {
        setTimeout(() => {
          let hTagList = document
            .querySelector(".previewMd")
            .querySelectorAll("h1,h2,h3,h4");
          hTagList.forEach(e => {
            let obj = {
              offsetTop: e.offsetTop,
              title: e.innerHTML,
              level: parseInt(e.tagName.slice(1))
            };
            this.directoryList.push(obj);
          });
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
  overflow: hidden;
  padding: 2rem;
  .articleHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content {
    line-height: 2rem;
  }
  button {
    border: none;
    background-color: rgba(252, 252, 252, 0);
  }
  .likeActive {
    transition: color 1s;
    color: map-get($colors, "red");
    animation: active 1s linear;
  }

  .directory {
    position: fixed;
    top: 100px;
    right: 16px;
    bottom: 16px;
  }

  $animate: (
    0%: 0.5,
    10%: 0.8,
    20%: 1.2,
    30%: 0.6,
    40%: 0.8,
    50%: 1.5,
    60%: 0.8,
    70%: 0.4,
    80%: 0.7,
    90%: 0.8,
    100%: 1.2
  );

  @keyframes active {
    @each $key, $value in $animate {
      #{$key} {
        transform: scale(#{$value});
      }
    }
  }
}
</style>