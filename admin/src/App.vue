<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  // todo: 手机测试不成功
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.$loading.show()
      this.$message.error("请使用PC浏览本网页")
    }
  }
};
</script>

<style lang="scss">
</style>
