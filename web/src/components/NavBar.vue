<template>
  <nav class="fs-xs bg-nav text-white d-flex ai-center jc-between">
    <ul>
      <div class="nav-item p-x-7" v-for="itemName in itemList" :key="itemName">
        <li @click="itemClick(itemName)">{{ itemName }}</li>
      </div>
    </ul>
    <div class="userInfo p-8">
      <span>{{ userName }}</span>
      <img
        class="m-x-8"
        src="http://p1.music.126.net/cvmt4nmLFJfU35VDkxJl0A==/109951164833038560.jpg?param=140y140"
        alt=""
      />
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      default() {
        return ["首页"];
      }
    },
    userName: {
      type: String,
      default() {
        return "XU_158";
      }
    }
  },
  methods: {
    itemClick(name) {
      this.$emit("navItemClick", name);
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  ul {
    display: inline-block;
    list-style: none;
    .nav-item {
      display: inline-block;
    }
    .nav-item:hover {
      color: rgb(226, 186, 112);
      font-size: 1rem;
    }
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
