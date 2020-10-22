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
.scale-ent-enter-active,
.scale-ent-leave-active,
.scale-out-enter-active,
.scale-out-leave-active {
  will-change: transform;
  transition: all 400ms;
}

// out 进入低 level 路由
// 进入前
.scale-out-leave-active {
  opacity: 0;
  transform: scale(0.5);
}
// 进入后
.scale-out-enter {
  opacity: 0;
  transform: scale(1.2);
}

// ent 进入高 level 路由
// 进入前
.scale-ent-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
//进入后
.scale-ent-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

.fade-enter-active,
.fade-leave-active,
.fade-enter-active,
.fade-leave-active {
  will-change: transform;
  transition: all 200ms;
}
.fade-enter {
  opacity: 0.3;
}

.fade-enter-active {
  opacity: 0.4;
}

.fade-leave {
  opacity: 0.6;
}

.fade-leave-active {
  opacity: 0.7;
}
</style>