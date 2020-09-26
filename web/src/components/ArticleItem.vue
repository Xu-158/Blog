<template>
  <div>
    <div class="articleBox" @click="boxClick">
      <div class="article">
        <div class="title fs-xl p-7 m-b-3 text-title">
          <span>∵</span>
          标题啊啊啊啊啊啊啊啊啊啊
        </div>
        <div class="articleContnet text-font">
          1.创建虚拟桌面: Win+Ctrl+D 2.虚拟桌面间切换: Win+Ctrl+(←/→)
          关闭虚拟桌面: Win+Ctrl+F4 3.全部窗口最小化: Win+M 查看桌面: Win+［,］
          4.打开任务栏应用: Win+(1~9) 5.应用窗口半屏化: Win+(←/→)
          6.显示运行应用: Ctrl+Alt+Tab 打开任务窗: Win+Tab 直接切换程序: Alt+Tab
          7.打开任务管理器: Ctrl+Shift+Esc 8.打开管理视窗: Win+E 9.放大镜:
          Win+(+/-) 10截屏: Win+PrintScreen6.显示运行应用: Ctrl+Alt+Tab
          打开任务窗: Win+Tab 直接切换程序: Alt+Tab 7.打开任务管理器:
          Ctrl+Shift+Esc 8.打开管理视窗: Win+E 9.放大镜: Win+(+/-) 10截屏:
          Win+PrintScreen6.显示运行应用: Ctrl+Alt+Tab 打开任务窗: Win+Tab
          直接切换程序: Alt+Tab 7.打开任务管理器: Ctrl+Shift+Esc 8.打开管理视窗:
          Win+E 9.放大镜: Win+(+/-) 10截屏: Win+PrintScreen6.显示运行应用:
          Ctrl+Alt+Tab 打开任务窗: Win+Tab 直接切换程序: Alt+Tab
          7.打开任务管理器: Ctrl+Shift+Esc 8.打开管理视窗: Win+E 9.放大镜:
          Win+(+/-) 10截屏: Win+PrintScreenv6.显示运行应用: Ctrl+Alt+Tab
          打开任务窗: Win+Tab 直接切换程序: Alt+Tab 7.打开任务管理器:
          Ctrl+Shift+Esc 8.打开管理视窗: Win+E 9.放大镜: Win+(+/-) 10截屏:
          Win+PrintScreen
        </div>
      </div>
      <div class="flex-1"></div>
      <img
        src="http://47.115.5.115/admin/uploads/images/1599793409318-test.jpg"
        alt="图裂开了"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    articleObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    boxClick() {
      this.$router.push("/article");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/_variables.scss";
.articleBox {
  width: 100%;
  height: 30vh;
  margin-bottom: 1rem;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  background-color: map-get($colors, "articleBox");
  &:hover {
    background-color: map-get($colors, "articleBoxArticle");
  }
  .article {
    flex: 8;
    height: 20vh;
    overflow: hidden;
    text-overflow: ellipsis;
    .title {
      font-weight: 600;
      letter-spacing: 0.3rem;
      line-height: 2rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    .articleContnet {
      text-indent: 2rem;
      letter-spacing: 0.2rem;
    }
  }
  img {
    flex: 4;
    width: 10vw;
    height: 20vh;
  }
  @media (max-width: 1024px) {
    img {
      flex: 4;
      width: 25vw;
      height: 20vh;
    }
  }
}
</style>