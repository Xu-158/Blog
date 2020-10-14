<template>
  <div class="noFound d-flex jc-center ai-center p-t-8">
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fonsize: 40,
      color1: "black",
      color2: "red",
      color3: "blue"
    };
  },
  mounted() {
    setInterval(() => {
      let temColor = this.color1;
      this.color1 = this.color2;
      this.color2 = this.color3;
      this.color3 = temColor;
      this.initCanvas();
    }, 300);
    this.initCanvas();
    window.onresize = () => {
      this.initCanvas();
    };
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      let winWidth = 300;
      let winHeight = 400;
      canvas.width = winWidth;
      canvas.height = winHeight;
      this.drawfont(ctx);
      this.drawKey(ctx);
      this.drawX(ctx);
      this.drawMsg(ctx);
    },
    drawfont(ctx) {
      ctx.font = `${this.fonsize}px Arial`;
      let gradient = ctx.createLinearGradient(0, 0, 300, 0);
      gradient.addColorStop("0", `${this.color1}`);
      gradient.addColorStop("0.5", `${this.color2}`);
      gradient.addColorStop("1", `${this.color3}`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 4;
      ctx.strokeText("404 Not Found", 10, 50);
    },
    drawKey(ctx) {
      ctx.beginPath();

      ctx.moveTo(180, 100);
      ctx.arc(150, 100, 30, 0, 2 * Math.PI);

      ctx.moveTo(170, 100);
      ctx.arc(150, 100, 15, 0, 2 * Math.PI);

      ctx.moveTo(150, 130);
      ctx.lineTo(150, 200);

      ctx.moveTo(150, 160);
      ctx.lineTo(140, 160);

      ctx.moveTo(150, 180);
      ctx.lineTo(160, 180);
      ctx.lineWidth = "2px";
      ctx.lineCap = "round";
      ctx.strokeStyle = "#FFD700";
      ctx.stroke();
    },
    drawX(ctx) {
      ctx.beginPath();
      ctx.moveTo(100, 70);
      ctx.lineTo(190, 200);
      ctx.moveTo(190, 70);
      ctx.lineTo(100, 200);
      ctx.strokeStyle = "red";
      ctx.stroke();
    },
    drawMsg(ctx) {
      ctx.beginPath();
      ctx.moveTo(10, 70);
      ctx.font = `${this.fonsize / 1.6}px Arial`;
      let gradient = ctx.createLinearGradient(0, 0, 400, 0);
      gradient.addColorStop("0", `${this.color1}`);
      gradient.addColorStop("0.5", `${this.color2}`);
      gradient.addColorStop("1", `${this.color3}`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#666";
      ctx.strokeText("你 的 打 开 方 式 不 正 确", 10, 280);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
