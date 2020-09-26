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
    <footer class="m-t-8"></footer>
  </div>
</template>

<script>
import navbar from "@/components/NavBar";
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
          navName: "友链",
          navRoute: "/friend"
        },
        {
          navName: "关于我",
          navRoute: "/about"
        }
      ]
    };
  },
  methods: {},
  components: {
    navbar
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/_variables.scss";
.homepage {
  background: url("../assets/images/bgImage.png");
  header {
    position: sticky;
    top: 0;
  }
  article {
    width: 100%;
    margin-top: 5rem;
    .content {
      width: 60%;
      height: 100vh;
      margin: 0 auto;
      // border: 1px solid rgb(236, 221, 221);
      box-shadow: 0 0 10px 10px rgb(194, 194, 194);
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
  }
}
</style>
