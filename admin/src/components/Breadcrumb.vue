<template>
  <div>
    <el-breadcrumb class="el-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item) in levelList"
        :key="item.name"
        :to="{ path: item.path }"
      >{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: []
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched;
      this.levelList = matched;
    }
  }
};
</script>

<style lang="scss">
.el-breadcrumb {
  padding-bottom: 10px;
  margin-bottom: 10px;
  .el-breadcrumb__inner{
    &:hover{
      color: rgb(5, 5, 5);
      font-size: 15px
    }
  }
  .el-breadcrumb__separator{
    color: black;
  }
}
</style>