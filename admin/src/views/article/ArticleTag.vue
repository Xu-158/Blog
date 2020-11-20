<template>
  <div class="articleTag">
    <el-button type="primary" plain @click="createTag">新建标签</el-button>
    <el-table class="table" :data="tableData" v-if="tableData">
      <el-table-column prop="_id" label="编号" width="350"></el-table-column>
      <el-table-column prop="title" label="标签名" width="350">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="selectArticles" label="文章数量">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.selectArticles.length }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" class="option" width="250">
        <template slot-scope="scope">
          <div>
            <el-button class="option-1" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
        :total="totalSize"
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
      totalSize: 1
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
      this.totalSize = res.data.totalSize;
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
          const res = await addTag({ title });
          if (res.status == 0) this.initTagList();
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
          const res = await updateTag({
            id: row._id,
            title: value,
            count: row.count
          });
          if (res.status == 0) this.initTagList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    async handleDelete(id) {
      const res = await deleteTag({ id });
      if (res.status == 0) this.initTagList();
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
  }
  .option-1 {
    margin-right: 10px;
  }
}
</style>
