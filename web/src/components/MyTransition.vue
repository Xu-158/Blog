<template>
  <transition :name="transitionName" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: {
    transitionName: {
      type: String,
      default: "scale-ent"
    }
  }
};
</script>

<style lang="scss" scoped>
// 离开上移 , 进入下降
.scale-ent-enter-active,
.scale-ent-leave-active {
  will-change: transform;
  transition: all 400ms;
}
.scale-ent-leave-active,
.scale-ent-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

// 淡入淡出
.fade-enter-active,
.fade-leave-active,
.fade-enter-active,
.fade-leave-active {
  will-change: transform;
  transition: all 200ms;
}
.fade-enter {
  opacity: 1;
}

.fade-enter-active {
  opacity: 0.1;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  opacity: 0.1;
}
</style>