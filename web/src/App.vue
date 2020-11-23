<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
};
</script>

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
    background: url("./assets/images/bgImage.jpg") center 0 no-repeat;
    background-size: cover;
  }
  min-height: 100vh;
}
</style>
