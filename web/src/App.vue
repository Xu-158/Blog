<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  // 解决手机 fixed不生效
  &::before {
    content: " ";
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("~@a/images/bgImage.png") center 0 no-repeat;
    background-size: cover;
  }
}
</style>
