<template>
  <div class="timeLine">
    <timelineitem
      v-for="item in timeLineList"
      :key="item._id"
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
