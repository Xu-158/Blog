<template>
  <div class="timeLineItem d-flex m-b-3" v-if="timeLineObj">
    <div class="line m-r-8">
      <div class="point"></div>
    </div>
    <div class="card bg-articleBox p-8 d-flex m-b-8">
      <div class="time text-white">{{ timeLineObj.time }}</div>
      <div class="TimeLinecontent m-l-5">
        <div class="title text-title p-x-8 fs-sm p-b-8">
          <span class="fs-lg text-dark">&#10148;</span>&nbsp;{{
            timeLineObj.title
          }}
        </div>
        <div class="content text-font p-x-8 fs-xs">
          &#9745;&#9744;
          <pre>{{ timeLineObj.content }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from "@/utils/dateFormat.js";
export default {
  props: {
    timeLineObj: {
      type: Object,
      required: true
    }
  },
  created() {
    this.timeLineObj.time = dateFormat("YYYY-mm-dd", new Date(this.timeLineObj.time))
  },
};
</script>

<style lang="scss" scoped>
.timeLineItem {
  .line {
    height: auto;
    width: 1px;
    background-color: rgb(0, 98, 122);
    position: relative;
    .point {
      width: 0.8rem;
      height: 0.8rem;
      background-color: rgb(0, 98, 122);
      position: absolute;
      left: -0.4rem;
      top: 0.4rem;
      border-radius: 0.4rem;
    }
  }
  .card {
    width: 80vw;
    .time {
      flex: 1;
      font-size: 0.9rem;
    }
    .TimeLinecontent {
      width: 50vw;
      flex: 9;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      .title {
        // 英文字母之间如果没有空格，系统认为是一个单词，就不会自动换行。汉字就没有这种情况。
        word-break: break-all;
        word-wrap: break-word;
        letter-spacing: 0.2rem;
        line-height: 1.8rem;
      }
      .content {
        // 英文字母之间如果没有空格，系统认为是一个单词，就不会自动换行。汉字就没有这种情况。
        word-break: break-all;
        word-wrap: break-word;
        letter-spacing: 0.15rem;
        line-height: 1.5rem;
        font-weight: 600;
      }
    }
    @media (max-width: 1024px) {
      .TimeLinecontent {
        flex: 4;
      }
    }
  }
}
</style>
