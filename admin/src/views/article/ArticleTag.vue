<template>
  <div class="articleTag">
    <el-button type="primary" plain @click="createTag">新建标签</el-button>
    <el-table class="table" :data="tableData" v-if="tableData">
      <el-table-column prop="_id" label="编号" width="300"></el-table-column>
      <el-table-column prop="title" label="标签名" width="250">
        <template slot-scope="scope">
          <el-tag>{{scope.row.title}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="文章数量" width="200">
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.count}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" class="option">
        <template slot-scope="scope">
          <div class="option-content">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除这个标签吗？" @onConfirm="handleDelete(scope.row._id)">
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="itemTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { addTag, updateTag, deleteTag, getTagList } from "@/api/article";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 8,
      itemTotal: 1 // 装备总数量
    };
  },
  created() {
    this.initTagList();
  },
  methods: {
    async initTagList() {
      const { page, pageSize } = this;
      const res = await getTagList({ page, pageSize });
      this.tableData = res.data.tagList;
      this.itemTotal = res.data.totalSize;
    },
    createTag() {
      let title;
      this.$prompt("请输入标签名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          if (!value) throw new Error("标签名不能为空");
          title = value;
          await addTag({ title });
          this.initTagList();
          this.$message({
            type: "success",
            message: "成功创建标签: "
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err === "cancel" ? "取消创建" : err
          });
        });
    },
    handleEdit(row) {
      this.$prompt("将 [ " + row.title + " ] 修改为", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: `${row.title}`
      })
        .then(async ({ value }) => {
          if (!value) throw new Error("标签名不能为空");
          await updateTag({ id: row._id, title: value, count: row.count });
          this.initTagList();
          this.$message({
            type: "success",
            message: "成功修改标签: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    async handleDelete(id) {
      await deleteTag({ id });
      this.initTagList();
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    },
    // 页数改变
    pageChange(currentPage) {
      this.page = currentPage;
      this.initTagList();
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/style/style.scss";
.articleTag {
  .table {
    padding: 20px;
    width: 100vw;
    height: 70vh;
  }
}
.option-content {
  display: flex;
  justify-content: space-between;
}
</style>