<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // todo: 手机测试不成功
  mounted() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.$loading.show();
      this.$message.error("请使用PC浏览本网页");
    }
  },
};
</script>