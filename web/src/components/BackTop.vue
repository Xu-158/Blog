<template>
  <div class="topBtn" @click="animateTop">
    <img src="@/assets/images/backTop.png" alt="" />
  </div>
</template>

<script>
import { animateTopMixin } from "@u/animateTopMixin";
export default {
  mixins: [animateTopMixin],
  data() {
    return {
      backTop: false,
    };
  },
  mounted() {
    // addEventListener(事件名，触发后调用的函数，布尔值用于描述事件是冒泡还是捕获)
    // 事件传递有两种方式：冒泡与捕获。
    // 事件传递定义了元素事件触发的顺序。 如果你将 <p> 元素插入到 <div> 元素中，用户点击 <p> 元素, 哪个元素的 "click" 事件先被触发呢？
    // 在 冒泡 中，内部元素的事件会先被触发，然后再触发外部元素，即： <p> 元素的点击事件先触发，然后会触发 <div> 元素的点击事件。
    // 在 捕获 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。
    // addEventListener('',()=>{},false) false- 默认值。事件句柄在冒泡阶段执行
    window.addEventListener("scroll", this.handleScroll, true);
    this.$once("hook:destroyed", () => {
      window.removeEventListener("scroll", this.handleScroll, true);
    });
  },
  methods: {
    handleScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop > 30 ? (this.backTop = true) : (this.backTop = false);
    },
  },
};
</script>

<style lang="scss" scoped>
.topBtn {
  position: fixed;
  right: 3rem;
  bottom: 2rem;
  img {
    width: 3rem;
    height: 4rem;
  }
}
@media (max-width: 1024px) {
  .topBtn {
    img {
      width: 3rem;
      height: 5rem;
    }
  }
}
</style>