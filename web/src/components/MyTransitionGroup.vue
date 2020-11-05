<template functional>
  <transition-group tag="div" :name="props.name">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "rightToLeft"
    }
  }
};
</script>

<style lang="scss" scoped>
/* 右到左水平移动 rightToLeft */
.rightToLeft-enter-active,
.rightToLeft-leave-active {
  transition: all 0.3s;
  opacity: 0;
  position: relative;
  left: 0;
}
.rightToLeft-enter,
.rightToLeft-leave-to {
  opacity: 1;
  left: 50vw;
}

/* 水平旋转 horizontalRotation */
.horizontalRotation-enter-active,
.horizontalRotation-leave-active {
  transition: all 0.3s;
  opacity: 0;
  transform: rotateY(30deg);
}
.horizontalRotation-enter,
.horizontalRotation-leave-to {
  opacity: 1;
  transform: rotateY(130deg);
}
</style>