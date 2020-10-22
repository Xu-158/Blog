<template>
  <div class="timeLineItem d-flex m-b-3" v-if="timeLineObj && !isMobile">
    <div class="card">
      <div v-if="index % 2 == 0" class=" TimeLinecontent p-x-8 m-r-3">
        <div class="title text-timeLineTitle p-t-8 p-x-8">
          {{ timeLineObj.title }}
        </div>
        <div class="content text-white">
          <p>{{ timeLineObj.content }}</p>
        </div>
      </div>
    </div>
    <div class="middleLine">
      <div class="time fs-xs text-articleBoxActive">{{ timeLineObj.time }}</div>
      <div class="line">
        <div class="point"></div>
      </div>
    </div>
    <div class="card">
      <div class="TimeLinecontent p-x-8 m-l-3" v-if="index % 2 != 0">
        <div class="title text-timeLineTitle p-t-8 p-x-8">
          {{ timeLineObj.title }}
        </div>
        <div class="content text-white">
          <p>{{ timeLineObj.content }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="timeLineItem d-flex m-b-3" v-else-if="timeLineObj && isMobile">
    <div class="card">
      <div class=" TimeLinecontent p-x-8 m-r-3 m-b-8">
        <div class="title text-timeLineTitle p-t-8 p-x-8">
          {{ timeLineObj.title }}
        </div>
        <div class="content text-white">
          <p>{{ timeLineObj.content }}</p>
        </div>
      </div>
    </div>
    <div class="middleLine">
      <div class="time fs-xs text-articleBoxActive">{{ timeLineObj.time }}</div>
      <div class="line">
        <div class="point"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from "@u/dateFormat.js";
import debounce from "@u/debounce";
export default {
  props: {
    timeLineObj: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      isMobile: false
    };
  },
  created() {
    this.timeLineObj.time = dateFormat(
      "YYYY-mm-dd",
      new Date(this.timeLineObj.time)
    );
  },
  mounted() {
    this._isMobile();
    window.addEventListener("resize", debounce(this._isMobile, 200));
  },
  methods: {
    _isMobile() {
      this.isMobile = window.innerWidth < 800 ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
.timeLineItem {
  display: flex;
  justify-content: space-between;
  .middleLine {
    flex: 2;
    .time {
      white-space: nowrap;
      font-weight: 700;
      text-align: center;
    }
    .line {
      margin: 0rem auto;
      width: 1px;
      height: 90%;
      background-color: rgb(0, 98, 122);
      position: relative;
      .point {
        width: 0.8rem;
        height: 0.8rem;
        background-color: rgb(0, 98, 122);
        position: absolute;
        left: -0.35rem;
        top: 0.3rem;
        border-radius: 0.4rem;
      }
    }
  }
  .card {
    flex: 6;
    .TimeLinecontent {
      background-color: rgba(111, 141, 161, 0.719);
      border-radius: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      .title {
        // 英文字母之间如果没有空格，系统认为是一个单词，就不会自动换行。汉字就没有这种情况。
        word-break: break-all;
        word-wrap: break-word;
        letter-spacing: 0.1rem;
        line-height: 1.2rem;
        font-weight: 600;
      }
      .content {
        // 英文字母之间如果没有空格，系统认为是一个单词，就不会自动换行。汉字就没有这种情况。
        word-break: break-all;
        word-wrap: break-word;
        letter-spacing: 0.15rem;
        line-height: 1.2rem;
        font-weight: 500;
        font-size: 0.85rem;
        padding-left: 2rem;
      }
    }
  }
}
@media (max-width: 1000px) {
  .timeLineItem {
    display: flex;
    justify-content: start;
  }
}
</style>
