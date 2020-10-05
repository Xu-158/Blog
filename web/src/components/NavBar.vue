<template>
  <nav class="fs-xs bg-nav text-white d-flex ai-center jc-between">
    <ul
      :class="{
        hiddNavItem: isMobile,
        showMobileNavItem: showMobileNavItem
      }"
    >
      <div
        class="nav-item p-x-7"
        v-for="(item, index) in navItemObj"
        :key="item.navRoute"
      >
        <li
          class="p-y-4 p-x-7"
          @click="navItemClick(item.navRoute, index)"
          :class="{ navActive: index == currIndex }"
        >
          {{ item.navName }}
        </li>
      </div>
    </ul>
    <div class="userInfo p-8" v-if="!isMobile">
      <span>{{ userName }}</span>
      <img
        class="m-x-8"
        src="http://p1.music.126.net/cvmt4nmLFJfU35VDkxJl0A==/109951164833038560.jpg?param=140y140"
        alt=""
      />
    </div>
    <div v-else>
      <div
        @click="showNavItem"
        class="menuBtn m-y-7 m-x-8 bg-dark p-6 text-white p-x-8 fs-xl"
      >
        ☰
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      showMobileNavItem: false,
      currIndex: 0
    };
  },
  props: {
    navItemObj: {
      type: Array,
      required: true
    },
    userName: {
      type: String,
      default() {
        return "XU_158";
      }
    }
  },
  created() {
    // 保证页面刷新后 navItem 任然是 active 状态
    let navRouteList = [];
    this.navItemObj.filter(curr => navRouteList.push(Object.values(curr)[1]));
    let index = navRouteList.indexOf(this.$route.fullPath);
    this.currIndex = index == -1 ? 0 : index;
  },
  mounted() {
    this._isMobile();
    window.addEventListener("resize", this._isMobile);
  },
  methods: {
    navItemClick(routeName, index) {
      this.showMobileNavItem = false;
      this.currIndex = index;
      this.$router.push(routeName);
    },
    _isMobile() {
      this.isMobile = window.innerWidth < 800 ? true : false;
      if (this.isMobile) this.showMobileNavItem = false;
    },
    showNavItem() {
      this.showMobileNavItem = !this.showMobileNavItem;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/_variables.scss";
nav {
  ul {
    display: inline-block;
    list-style: none;
    .nav-item {
      display: inline-block;
      &:hover {
        transition: all 0.4s;
        transform: skewY(10deg);
        transform: skewX(-10deg);
        transform: translate(-4px, -4px);
      }
    }
  }
  .hiddNavItem {
    display: none;
  }
  .showMobileNavItem {
    display: block;
    .nav-item {
      line-height: 2.2rem;
      font-size: 1.5rem;
      display: block;
    }
  }
  .navActive {
    transform: skewY(10deg);
    transform: skewX(-10deg);
    transform: translate(-4px, -4px);
    color: map-get($colors, "title");
    font-weight: bold;
    background-color: rgba(145, 143, 143, 0.37);
    box-shadow: 6px 6px 4px rgb(0, 0, 0);
  }
}
.userInfo {
  float: right;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
