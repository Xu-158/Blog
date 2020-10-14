<template>
  <div class="source">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="key">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <a
            style="margin-left: 10px"
            :href="baseUrl + scope.row.key"
            target="block"
            >http://img.xujinfeng.top/{{ scope.row.key }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="mimeType">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <img
              :src="baseUrl + scope.row.key"
              alt=""
              width="100"
              height="100"
            />
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">预览</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <audio autoplay :src="baseUrl + scope.row.key"></audio>
          <h2>{{baseUrl + scope.row.key}}</h2>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getQiniuSource } from "@/api/qiniu";
export default {
  data() {
    return {
      baseUrl: "http://img.xujinfeng.top/",
      tableData: []
    };
  },
  created() {
    this.getSource();
  },
  methods: {
    async getSource() {
      const result = await getQiniuSource();
      this.tableData = result.data.items;
    }
  }
};
</script>

<style>
</style>