/**
 * 回到顶部
 * methods:animateTop()
 */

export const animateTopMixin = {
  methods: {
    animateTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -=
          50 * 1.5;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
}