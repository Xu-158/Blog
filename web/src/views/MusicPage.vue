<template>
  <div class="about">
    <h1 class="text-font">This is MusicPage</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null
    };
  },
  activated() {
    console.log("activated: ");
    this.timer = setInterval(() => {
      console.log("timer");
    }, 1000);

    //hook来监听 beforeDestory 生命周期。因为只要监听一次就够了，所以用$once来注册监听。
    this.$once("hook:deactivated", () => {  
      console.log("deactivated: ");
      clearInterval(this.timer);
      this.timer = null;
    });
  }
  
  // 创建的定时器代码和销毁定时器的代码没有放在一起，通常很容易忘记去清理这个定时器，不容易维护;
  // deactivated() {
  //   console.log("deactivated: ");
  //   clearInterval(this.timer);
  //   this.timer = null;
  // }
};
</script>
