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
        <keep-alive max="6" exclude="articlePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </article>
    <footer class="m-t-8">
      <div class="footerContent d-flex jc-start ai-center">
        <div class="friend" v-if="friendList">
          <div class="m-b-6 text-title">友情链接：</div>
          <div class="m-b-5 friendLinkItems">
            <a
              class="text-title fs-xs"
              v-for="friend in friendList"
              :key="friend._id"
              :href="friend.url"
              target="_blank"
              >{{ friend.name
              }}<span class="fs-xxs">：{{ friend.description }}</span></a
            >
          </div>
        </div>
        <div class="data">datadata</div>
      </div>
    </footer>
    <backTop class="topBtn"></backTop>
  </div>
</template>

<script>
import navbar from "@c/NavBar";
import BackTop from "@c/BackTop";
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
      showMobileNavItem: false // 控制移动端菜单展开
    };
  },
  created() {
    this.getFriendList();
  },
  methods: {
    async getFriendList() {
      const res = await getFriendList();
      this.friendList = res.data;
    }
  },
  components: {
    navbar,
    BackTop
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
    width: 100%;
    margin-top: 3rem;
    min-height: 70vh;
    .content {
      border-radius: 2rem;
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
    margin-top: 3rem;
    width: 100%;
    height: 20vh;
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
