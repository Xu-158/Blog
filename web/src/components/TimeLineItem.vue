<template>
  <div class="timeLineItem d-flex m-b-3" v-if="timeLineObj">
    <div class="line m-r-8">
      <div class="point"></div>
    </div>
    <div class="card bg-articleBox p-8 d-flex m-b-8">
      <div class="time">{{ timeLineObj.time }}</div>
      <div class="TimeLinecontent d-flex flex-column">
        <div class="title">{{ timeLineObj.title }}</div>
        <div class="content">{{ timeLineObj.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeLineObj: {
      type: Object,
      required: true
    }
  }
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
    border: 1px dashed #666;
    .time {
      width: 10vw;
    }
    .TimeLinecontent {
      .title {
        width: 100%;
        flex-wrap: wrap;
      }
      .content {
        width: 100%;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
