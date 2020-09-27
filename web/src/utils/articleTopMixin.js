export default {
  methods: {
    articleTopMixin(array) {
      array.filter((curr, index, arr) => {
        if (curr.isTop) {
          arr.splice(index, 1);
          arr.unshift(curr);
        }
      });
    }
  }
};
