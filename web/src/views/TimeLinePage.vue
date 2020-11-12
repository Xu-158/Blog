<template>
  <div class="timeLine p-8">
    <time-line-item
      v-for="(item, index) in timeLineList"
      :key="item._id"
      :index="index"
      :timeLineObj="item"
    ></time-line-item>
  </div>
</template>

<script>
import { getTimeLineList } from "@api";
import TimeLineItem from "@c/TimeLineItem.vue";
export default {
  data() {
    return {
      timeLineList: []
    };
  },
  created() {
    this.getTimeLineList();
  },
  methods: {
    async getTimeLineList() {
      const res = await getTimeLineList();
      this.timeLineList = res.data;
    }
  },
  components: { TimeLineItem }
};
</script>
