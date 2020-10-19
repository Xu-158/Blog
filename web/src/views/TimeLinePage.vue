<template>
  <div class="timeLine p-8">
    <timelineitem
      v-for="(item,index) in timeLineList"
      :key="item._id"
      :index="index"
      :timeLineObj="item"
    ></timelineitem>
  </div>
</template>

<script>
import { getTimeLineList } from "@api";
import timelineitem from "@c/TimeLineItem.vue";
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
  components: { timelineitem }
};
</script>
