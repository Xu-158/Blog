<template>
  <div>
    <h2>文章列表</h2>
    <el-table :data="tableData" class="table">
      <el-table-column prop="title" label="标题">
        <template slot-scope="scope">
          <div class="title">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="tagNames" label="文章标签">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.tags"
            :key="item._id"
            style="margin:3px 3px"
            >{{ item.title }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建日期" width="180"
        ><template slot-scope="scope">
          <div>
            {{ regData(scope.row.createdAt) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isTop" label="是否置顶" width="80">
        <template slot-scope="scope">
          <div>
            <i
              v-if="scope.row.isTop"
              class="el-icon-success"
              style="color:#67c23A;font-size: 26px;"
            ></i>
            <i
              v-else
              class="el-icon-error"
              style="color:#ff0000;font-size: 26px;"
            ></i>
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
            <i
              v-else
              class="el-icon-error"
              style="color:#ff0000;font-size: 26px;"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lickCount" label="浏览量/点赞数" width="140">
        <template slot-scope="scope">
          <div>
            <el-tag type="success">{{ scope.row.hitCount }}</el-tag
            >&nbsp;
            <el-tag type="danger">{{ scope.row.likeCount }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="goEdit(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button @click="toDelete(scope.row)" type="danger" size="small"
            >删除</el-button
          >
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
  computed: {
    regData() {
      return data => {
        return dateFormat("YYYY-mm-dd HH:MM", new Date(data));
      };
    }
  },
  methods: {
    async initData() {
      const { page, pageSize } = this;
      const res = await getArticleList({ page, pageSize });
      this.tableData = res.data.data;
      this.articleTotal = res.data.totalSize;
    },

    goEdit(row) {
      this.$router.push(`/article/ArticleUpdate/${row._id}`);
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