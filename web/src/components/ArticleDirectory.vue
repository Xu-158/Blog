<template>
  <div class="directory-btn" v-if="directoryList.length != 0">
    <div class="directory-card p-5">
      <ul class="p-x-1 text-white menu">
        <p class="fs-lg p-l-8">目录：</p>
        <li
          class="menu-item"
          :style="{
            fontSize: itemFontSize(item.level),
            marginLeft: itemMarginLeft(item.level)
          }"
          :class="{
            activeItem: activeItemIndex === index
          }"
          v-for="(item, index) in directoryList"
          :key="item.offsetTop"
          @click="menuItemClick(item.offsetTop, index)"
        >
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import debounce from "@u/debounce";
export default {
  props: {
    directoryList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeItemIndex: 0,
      itemOffsetTopList: []
    };
  },
  mounted() {
    window.addEventListener("scroll", debounce(this.calcActiveIndex, 10));
  },
  watch: {
    directoryList(newVal, oldVal) {
      this.initDirectoryList();
    }
  },
  computed: {
    //根据level 计算 fontSize
    itemFontSize() {
      return level => {
        switch (level) {
          case 1:
            return "1.5rem";
            break;
          case 2:
            return "1.3rem";
            break;
          case 3:
            return "1rem";
            break;
          case 4:
            return "0.8rem";
            break;
          default:
            return "0.8rem";
            break;
        }
      };
    },
    //根据level 计算 marginLeft
    itemMarginLeft() {
      return level => {
        switch (level) {
          case 1:
            return "1rem";
            break;
          case 2:
            return "2rem";
            break;
          case 3:
            return "3rem";
            break;
          case 4:
            return "3.5rem";
            break;
          default:
            return "3.5rem";
            break;
        }
      };
    }
  },
  methods: {
    menuItemClick(offsetTop, index) {
      this.activeItemIndex = index;
      offsetTop = offsetTop - 60;
      document.documentElement.scrollTop || this.scrollAnimate(100, offsetTop);
      document.body.scrollTop || this.scrollAnimate(100, offsetTop);
    },

    // 初始化 h标签 距离顶部数组
    initDirectoryList() {
      this.directoryList.forEach(item => {
        this.itemOffsetTopList.push(item.offsetTop);
      });
    },

    // 计算滚动区间
    calcActiveIndex() {
      let nowScrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      this.itemOffsetTopList.map((curr, index) => {
        if (
          (curr >= nowScrollTop && !this.itemOffsetTopList[index - 1]) ||
          this.itemOffsetTopList[index - 1] <= nowScrollTop
        ) {
          this.activeItemIndex = index;
          if (this.$el.querySelector(".menu").clientHeight > 500)
            this.$el.querySelector(".menu").style.marginTop =
              -index * 2.3 + "rem";
        }
      });
    },

    scrollAnimate(speed, toNumber = 0) {
      if (!speed) {
        document.documentElement.scrollTop = document.body.scrollTop = toNumber;
        return;
      }
      //计算动画次数
      let count = 10;
      //获取当前scrollTop距离
      let nowScrollTop =
        document.documentElement.scrollTop + document.body.scrollTop;
      //计算当每次滑动距离
      let scrollValue = (nowScrollTop - toNumber) / count;

      let scrollTimer = setInterval(() => {
        if (count > 0) {
          count--;
          document.documentElement.scrollTop = document.body.scrollTop = nowScrollTop -= scrollValue;
        } else {
          clearInterval(scrollTimer);
        }
      }, speed / 10);
    }
  }
};
</script>

<style lang="scss" scoped>
.directory-btn {
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.144);
  .directory-card {
    width: 17vw;
    overflow: scroll;
    .menu-item {
      list-style: none;
      position: relative;
      span {
        display: inline-block;
        overflow: hidden;
        width: 11vw;
        line-height: 2rem;
        word-break: keep-all;
        white-space: nowrap;
      }
      &::before {
        content: "";
        background-color: rgb(202, 187, 187);
        position: absolute;
        border: 0.2rem solid rgb(202, 187, 187);
        border-radius: 50%;
        font-size: 3rem;
        top: 0.8rem;
        left: -20px;
      }
      &::after {
        content: "...";
      }
    }
    .activeItem {
      color: map-get($colors, "directoryActive") !important;
      font-weight: 600;
    }
  }
}
// Chrome下隐藏滚动条
.directory-card::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
.directory-card {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>