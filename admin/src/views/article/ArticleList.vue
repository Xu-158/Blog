<template>
  <div>
    <h2>文章列表</h2>
    <el-table :data="tableData" class="table">
      <!-- <el-table-column prop="_id" label="编号" width="220"></el-table-column> -->
      <el-table-column prop="title" label="标题" width="350">
        <template slot-scope="scope">
          <div class="title">{{scope.row.title}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="tagNames" label="文章标签" width="300">
        <template slot-scope="scope">
          <el-tag>{{scope.row.tagNames.join(' - ')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建日期" width="150"></el-table-column>
      <el-table-column prop="isTop" label="是否置顶" width="80">
        <template slot-scope="scope">
          <div>
            <i
              v-if="scope.row.isTop"
              class="el-icon-success"
              style="color:#67c23A;font-size: 26px;"
            ></i>
            <i v-else class="el-icon-error" style="color:#ff0000;font-size: 26px;"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isShow" label="是否可见" width="80">
        <template slot-scope="scope">
          <div>
            <i
              v-if="scope.row.isShow"
              class="el-icon-success"
              style="color:#67c23A;font-size: 26px;"
            ></i>
            <i v-else class="el-icon-error" style="color:#ff0000;font-size: 26px;"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="goEdit(scope.row._id)" type="primary" size="small">编辑</el-button>
          <el-button @click="toDelete(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleTotal"
        :page-size="pageSize"
        :current-page="page"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticleList, deleteArticle } from "@/api/article";
import dateFormat from "@/utils/dateFormat";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 8,
      articleTotal: 1 // 总数量
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { page, pageSize } = this;
      const res = await getArticleList({ page, pageSize });
      this.tableData = res.data.data;
      this.articleTotal = res.data.totalSize;

      // 数据格式
      this.tableData.map(obj => {
        const tagNames = [];
        obj.createdAt = dateFormat("YYYY-mm-dd HH:MM", new Date(obj.createdAt));
        obj.tags.map(tag => {
          tagNames.push(tag.title + " ");
        });
        this.$set(obj, "tagNames", tagNames);
      });
    },

    goEdit(id) {
      this.$router.push(`/article/ArticleUpdate/${id}`);
    },

    toDelete(row) {
      const { page, tableData } = this;
      this.$confirm(`此操作将永久删除 "${row.title}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await deleteArticle({ id: row._id });
          if (res.status === 0) {
            this.$message.success(`${res.msg}`);
            // 如果当前不是第一页且当前页只有一条数据
            if (page != 1 && tableData.length == 1) {
              this.page--;
            }
            this.initData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 页数改变
    pageChange(currentPage) {
      this.page = currentPage;
      this.initData();
    }
  }
};
</script>

<style lang="scss" scoped>
.row-button {
  display: flex;
}
.table {
  .title {
    font-weight: 800;
    font-size: 18px;
  }
}
</style>