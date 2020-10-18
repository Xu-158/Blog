<template>
  <div class="directory-btn" v-if="directoryList.length != 0">
    <div class="directory-card p-3">
      <ul class="p-x-1 text-white menu">
        <p class="fs-lg">目录：</p>
        <li
          class="menu-item"
          :style="{
            color: item.level <= 2 ? 'white' : '#ffffff',
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
          <p>{{ item.title }}</p>
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
    //根据level 计算 fontSize
    itemMarginLeft() {
      return level => {
        switch (level) {
          case 2:
            return "1rem";
            break;
          case 3:
            return "2rem";
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

    initDirectoryList() {
      this.directoryList.forEach(item => {
        this.itemOffsetTopList.push(item.offsetTop);
      });
    },

    calcActiveIndex() {
      let nowScrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      this.itemOffsetTopList.map((curr, index) => {
        if (
          curr >= nowScrollTop &&
          nowScrollTop >= this.itemOffsetTopList[index - 1]
        ) {
          this.activeItemIndex = index - 1;
          if (this.$el.querySelector(".menu").clientHeight > 500)
            this.$el.querySelector(".menu").style.marginTop =
              -(index - 1) * 2.3 + "rem";
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
  .directory-card {
    width: 17vw;
    background-color: rgba(255, 255, 255, 0.144);
    // height: 60vh;
    overflow: scroll;
    .menu-item {
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: 0.2rem;
        line-height: 1.5rem;
      }
    }
    .activeItem {
      color: map-get($colors, "scrollbar-thumb") !important;
      font-weight: 600;
    }
  }
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #ffffff00;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(235, 2, 2, 0.5);
  background-color: map-get($colors, "scrollbar-thumb");
}
</style>