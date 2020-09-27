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
import { getTimeLineList } from "@/api/api";
import timelineitem from "@/components/TimeLineItem.vue";
import dateFormat from "@/utils/dateFormat.js";
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
      this.timeLineList.filter(
        cur => (cur.time = dateFormat("YYYY-mm-dd", new Date(cur.time)))
      );
    }
  },
  components: { timelineitem }
};
</script>
