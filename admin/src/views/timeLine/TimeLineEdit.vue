<template>
  <div>
    <h2 class="title">{{ timeLine._id ? "编辑" : "新建" }}时间线</h2>
    <el-form ref="form" :model="timeLine" label-width="120px" size="mini">
      <el-form-item label="标题 : ">
        <el-input v-model="timeLine.title"></el-input>
      </el-form-item>

      <el-form-item label="创建时间 : ">
        <el-date-picker
          v-model="timeLine.time"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="时间线内容 : ">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="timeLine.content"
        ></el-input>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="editTimeLine"
          >立即{{ timeLine._id ? "修改" : "创建" }}</el-button
        >
        <el-button type="danger" @click="deleteTimeLine" v-if="timeLine._id"
          >删除</el-button
        >
        <el-button @click="back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTimeLine, updateTimeLine, deleteTimeLine } from "@/api/timeLine";
export default {
  data() {
    return {
      timeLine: {
        title: "",
        time: "",
        content: "",
      },
    };
  },
  mounted() {
    if (this.$route.query.timeLine) this.timeLine = this.$route.query.timeLine;
  },
  methods: {
    async editTimeLine() {
      const timeLine = this.timeLine;
      let res;
      if (this.timeLine._id) {
        res = await updateTimeLine({ id: this.timeLine._id, timeLine });
      } else {
        res = await addTimeLine({ timeLine });
      }
      this.back(res);
    },
    async deleteTimeLine() {
      const id = this.timeLine._id;
      const res = await deleteTimeLine({ id });
      this.back(res);
    },
    back(res) {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
