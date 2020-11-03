<template>
  <div class="homepage bg-bg">
    <header>
      <!-- sync 实现父子组件的数据双向绑定  -->
      <!-- <navbar:showMobileNavItem.sync="showMobileNavItem" ></navbar> 等价于↓ -->
      <!-- <navbar:showMobileNavItem="showMobileNavItem" @update:showMobileNavItem="newVal =>showMobileNavItem = newVal" ></navbar> -->
      <navbar
        :navItemObj="navItemObj"
        :showMobileNavItem.sync="showMobileNavItem"
      ></navbar>
    </header>
    <article class="m-t-8">
      <div class="content bg-white">
        <!-- <keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。 -->
        <!-- 一可以减少服务器请求次数，二则可以在用户返回上一页后记忆到上次浏览位置（ios端微信浏览器不适用) -->
        <transition :name="transitionName">
          <keep-alive max="6" exclude="articlePage">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </article>
    <footer class="m-t-8">
      <div class="footerContent d-flex jc-start ai-center">
        <div class="friend" v-if="friendList">
          <div class="m-b-6 text-title">友情链接：</div>
          <div class="m-b-5 friendLinkItems">
            <a
              class="text-title fs-xxs"
              v-for="friend in friendList"
              :key="friend._id"
              :href="friend.url"
              target="_blank"
              >{{ friend.name
              }}<span class="fs-xxs">：{{ friend.description }}</span></a
            >
          </div>
        </div>
        <div class="data  text-title">
          <a class="text-title fs-xs" href="http://beian.miit.gov.cn"
            >粤ICP备2020100622号</a
          >
          <p class="fs-xxs">© 2020 XU. All rights reserved.</p>
        </div>
      </div>
    </footer>
    <backTop class="topBtn" v-show="showBackTopBtn"></backTop>
  </div>
</template>

<script>
import navbar from "@c/NavBar";
import BackTop from "@c/BackTop";
import Transition from "@c/Transition";
import { getFriendList } from "@api";
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
      showMobileNavItem: false, // 控制移动端菜单展开
      showBackTopBtn: false,
      transitionName: ""
    };
  },
  created() {
    this.getFriendList();
  },
  watch: {
    $route(to, from) {
      if (to.meta.level > from.meta.level) {
        this.transitionName = "scale-ent";
      } else {
        this.transitionName = "scale-out";
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.showToTopBtn);
    this.$once("hook:destroyed", () => {
      window.removeEventListener("scroll", this.showToTopBtn);
    });
  },
  methods: {
    async getFriendList() {
      const res = await getFriendList();
      this.friendList = res.data;
    },
    // 滑动显示顶部菜单
    showToTopBtn() {
      if (this.showMobileNavItem) {
        this.showMobileNavItem = !this.showMobileNavItem;
      }
      // document.documentElement.scrollTop     chorme/Firefox
      // document.body.scrollTop    edge
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      this.showBackTopBtn = top > 1000 ? true : false;
    }
  },
  components: {
    navbar,
    BackTop,
    Transition
  }
};
</script>

<style lang="scss" scoped>
.homepage {
  header {
    position: sticky;
    top: 0;
    height: 10vh;
    z-index: 999;
  }
  article {
    margin-top: 2rem;
    min-height: 80vh;
    .content {
      border-radius: 2rem;
      width: 60vw;
      margin: 0 auto;
      box-shadow: 0 0 10px 10px rgb(194, 194, 194);
      padding: 1rem;
      overflow: hidden;
    }
    @media (max-width: 1024px) {
      .content {
        min-height: 70vh;
        width: 90vw;
      }
    }
  }
  footer {
    margin-top: 3rem;
    width: 100%;
    background-color: map-get($colors, "footer");
    .footerContent {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      .friend {
        flex: 1;
        padding: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 10px;
        a {
          display: block;
        }
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
}
</style>
