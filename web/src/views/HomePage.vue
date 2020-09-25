<template>
  <div class="homepage bg-bg">
    <header>
      <navbar :itemList="itemList" @navItemClick="navItemClick"></navbar>
    </header>
    <article class="m-t-8">
      <div class="content bg-white"></div>
    </article>
    <footer></footer>
  </div>
</template>

<script>
import navbar from "@/components/NavBar";
export default {
  name: "Home",
  data() {
    return {
      itemList: ["首页", "分类", "时光机", "友链", "关于我"]
    };
  },
  methods: {
    navItemClick(itemName) {
      switch (itemName) {
        case "首页":
          this.$router.push("/404");
          break;

        default:
          break;
      }
    }
  },
  components: {
    navbar
  }
};
</script>

<style lang="scss" scoped>
.homepage {
  header {
    position: sticky;
    top: 0;
  }
  article {
    width: 100%;
    .content {
      width: 60%;
      height: 100vh;
      margin: 0 auto;
      border: 1px solid grey;
      box-shadow: 0 0 10px 10px rgb(90, 90, 90);
    }
    @media (max-width: 1024px) {
      .content {
        width: 90%;
      }
    }
  }
}
</style>
