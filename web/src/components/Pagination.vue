<template>
  <div class="pagination">
    <button
      class="btn m-x-3 p-x-8 p-y-2 fs-md"
      v-for="(item, index) in pageCount"
      :key="item"
      :class="{ btnActive: index == currentPage }"
      @click="btnClick(index)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
import { animateTopMixin } from "@u/animateTopMixin";
export default {
  mixins: [animateTopMixin],
  props: {
    totalSize: {
      required: true,
      type: Number,
    },
    currentPage: {
      required: true,
      type: Number,
    },
    onePageSize: {
      required: true,
      type: Number,
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalSize / this.onePageSize);
    },
  },
  methods: {
    btnClick(index) {
      this.animateTop();
      this.$emit("pageChange", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  float: right;
  .btn {
    border: none;
    border-radius: 5px;
    box-shadow: 1px -1px 20px rgba(12, 150, 204, 0.603);
    &:hover {
      background: rgba(35, 94, 255, 0.733);
      color: #fff;
    }
  }
  .btnActive {
    background: rgba(6, 42, 121, 0.678);
    color: #fff;
  }
}
</style>