<template>
  <div class="homepage bg-bg">
    <header>
      <navbar :navItemObj="navItemObj"></navbar>
    </header>
    <article class="m-t-8">
      <div class="content bg-white">
        <router-view></router-view>
      </div>
    </article>
    <footer class="m-t-8">
      <div class="footerContent d-flex jc-start ai-center">
        <div class="friend" v-if="friendList">
          <div class="m-b-6 text-title">友情链接：</div>
          <div class="m-b-5" v-for="friend in friendList" :key="friend._id">
            <a class="text-title" :href="friend.url"
              >{{ friend.name }}<span>--{{ friend.description }}</span></a
            >
          </div>
        </div>
        <div class="data">datadata</div>
      </div>
    </footer>
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
      friendList: []
    };
  },
  created() {
    this.getFriendList();
  },
  methods: {
    async getFriendList() {
      const res = await getFriendList();
      this.friendList = res.data;
      console.log(this.friendList);
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
    height: 25vh;
    background-color: map-get($colors, "footer");
    .footerContent {
      width: 60%;
      margin: 0 auto;
      height: 25vh;
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
}
</style>
