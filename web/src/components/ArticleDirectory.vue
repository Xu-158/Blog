<template>
  <div class="directory-btn">
    <!-- <img src="@/assets/images/directory.png" alt="" srcset="" /> -->
    <div class="directory-card bg-white p-3">
      <ul class="p-3 text-dark fs-sm">
        <li><p>目录：</p></li>
        <li
          class="menu-item p-4 fs-sm"
          :class="{ activeItem: activeItemIndex === index }"
          v-for="(item, index) in directoryList"
          :key="item.offsetTop"
          @click="menuItemClick(item.offsetTop, index)"
        >
        <span class="trim" v-for="count in item.level" :key="count"></span>
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    directoryList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeItemIndex: 0
    };
  },
  methods: {
    menuItemClick(offsetTop, index) {
      this.activeItemIndex = index;
      offsetTop = offsetTop - 60;
      document.documentElement.scrollTop ||
        (document.documentElement.scrollTop = offsetTop);
      document.body.scrollTop ||
        (document.documentElement.scrollTop = offsetTop);
    }
  }
};
</script>

<style lang="scss" scoped>
.directory-btn {
  .directory-card {
    width: 15vw;
    border-radius: 5%;
    .menu-item {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.2rem;
      .trim{
        margin-left: 1rem;
      }
    }
    .activeItem {
      color: map-get($colors, "blue");
    }
  }
}
</style>