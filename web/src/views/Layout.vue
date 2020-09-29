<template>
  <div class="homepage bg-bg">
    <div id="topAnchor"></div>
    <header>
      <navbar :navItemObj="navItemObj"></navbar>
    </header>
    <article class="m-t-8">
      <div class="content bg-white">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </article>
    <footer class="m-t-8">
      <div class="footerContent d-flex jc-start ai-center">
        <div class="friend" v-if="friendList">
          <div class="m-b-6 text-title">友情链接：</div>
          <div class="m-b-5" v-for="friend in friendList" :key="friend._id">
            <a class="text-title fs-xs" :href="friend.url" target="_blank"
              >{{ friend.name
              }}<span class="fs-xxs">：{{ friend.description }}</span></a
            >
          </div>
        </div>
        <div class="data">datadata</div>
      </div>
    </footer>
    <div class="topBtn" @click="topTop">
      <!-- <a href="#topAnchor" style="position:fixed;right:0;bottom:0"></a> -->
      <img src="@/assets/images/backTop.png" alt="" />
    </div>
  </div>
</template>

<script>
import navbar from "@/components/NavBar";
import { getFriendList } from "@/api/api";
export default {
  name: "Home",
  data() {
    return {
      navItemObj: [
        {
          navName: "首页",
          navRoute: "/"
        },
        {
          navName: "分类",
          navRoute: "/category"
        },
        {
          navName: "时光机",
          navRoute: "/timeLine"
        },
        {
          navName: "音乐盒",
          navRoute: "/music"
        },
        {
          navName: "关于我",
          navRoute: "/about"
        }
      ],
      friendList: [],
      backTop: false
    };
  },
  created() {
    this.getFriendList();
  },
  mounted() {
    // addEventListener(事件名，触发后调用的函数，布尔值用于描述事件是冒泡还是捕获)
    // 事件传递有两种方式：冒泡与捕获。
    // 事件传递定义了元素事件触发的顺序。 如果你将 <p> 元素插入到 <div> 元素中，用户点击 <p> 元素, 哪个元素的 "click" 事件先被触发呢？
    // 在 冒泡 中，内部元素的事件会先被触发，然后再触发外部元素，即： <p> 元素的点击事件先触发，然后会触发 <div> 元素的点击事件。
    // 在 捕获 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    async getFriendList() {
      const res = await getFriendList();
      this.friendList = res.data;
    },
    handleScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop > 30 ? (this.backTop = true) : (this.backTop = false);
    },
    topTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
  components: {
    navbar
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/_variables.scss";
.homepage {
  header {
    position: sticky;
    top: 0;
  }
  article {
    width: 100%;
    margin-top: 5rem;
    min-height: 60vh;
    .content {
      width: 60%;
      margin: 0 auto;
      box-shadow: 0 0 10px 10px rgb(194, 194, 194);
      padding: 1rem;
    }
    @media (max-width: 1024px) {
      .content {
        width: 90%;
      }
    }
  }
  footer {
    margin-top: 5rem;
    width: 100%;
    height: 20vh;
    background-color: map-get($colors, "footer");
    .footerContent {
      width: 60%;
      margin: 0 auto;
      height: 20vh;
      text-align: center;
      .friend {
        flex: 1;
        padding: 2rem;
      }
      .data {
        flex: 1;
        padding: 2rem;
      }
    }
    @media (max-width: 1024px) {
      .footerContent {
        width: 90%;
      }
    }
  }
  .topBtn {
    position: fixed;
    right: 3rem;
    bottom: 2rem;
  }
  @media (max-width: 1024px) {
    .topBtn {
      img {
        width: 3rem;
        height: 5rem;
      }
    }
  }
}
</style>
