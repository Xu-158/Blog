<template>
  <div class="block" v-if="showEdit">
    <router-view></router-view>
  </div>
  <div v-else>
    <el-button type="primary" @click="createTimeLine" v-if="!showEdit">
      <span>创建时间线</span>
    </el-button>
    <el-timeline class="timeline" reverse>
      <el-timeline-item
        v-for="item in timeLineList"
        :key="item._id"
        :timestamp="item.time | dateFormatFilters('YYYY-mm-dd')"
        color="#409eff"
        placement="bottom"
      >
        <div @click="editTimeLine(item)">
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ item.content }}</p>
          </el-card>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getTimeLineList } from "@/api/timeLine";
import dateFormatFilters from "@/utils/dateFormatFilters.js";
export default {
  mixins: [dateFormatFilters],
  data() {
    return {
      showEdit: false,
      timeLineList: [],
    };
  },
  mounted() {
    const showEdit = this.$route.query.showEdit;
    if (showEdit) {
      this.showEdit = showEdit;
    }
    this.initTimeLine();
  },
  methods: {
    createTimeLine() {
      this.$router.push({
        path: "/timeLine/timeLineList/timeLineEdit",
        query: { showEdit: "true" },
      });
    },
    changeShowEdit() {
      this.$set(this, "showEdit", !this.showEdit);
    },
    async initTimeLine() {
      const res = await getTimeLineList();
      this.timeLineList = res.data;
    },
    editTimeLine(item) {
      this.$router.push({
        path: "/timeLine/timeLineList/timeLineEdit",
        query: { showEdit: "true", timeLine: item },
      });
    },
  },
};
</script>

<style lang="scss">
.timeline {
  padding: 20px;
}
</style>
