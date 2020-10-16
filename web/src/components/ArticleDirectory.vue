<template>
  <div class="directory">
    <ul>
      <li v-for=" item in directoryList" :key="item.offsetTop">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    directoryList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.directory {
  position: fixed;
  right: 0rem;
  bottom: 15rem;
  width: 15rem;
  height: 20rem;
  background-color: #fff;
  img {
    width: 3rem;
    height: 4rem;
  }
}
@media (max-width: 1024px) {
  .directory {
    img {
      width: 3rem;
      height: 5rem;
    }
  }
}
</style>