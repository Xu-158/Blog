<template>
  <div class="FriendLink">
    <el-button type="primary" plain @click="openDialog = true">
      <div>友情链接列表</div>
    </el-button>

    <el-dialog title="信息添加" :visible.sync="openDialog">
      <el-form :model="formData">
        <el-form-item label="链接名称" :label-width="formLabelWidth">
          <el-input v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth">
          <el-input v-model="formData.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">取 消</el-button>
        <el-button type="primary" @click="createLink">
          <div>确 定</div>
        </el-button>
      </div>
    </el-dialog>

    <el-table class="table" :data="tableData" v-if="tableData">
      <el-table-column prop="_id" label="编号" width="350"></el-table-column>
      <el-table-column prop="title" label="链接名字" width="250">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="链接地址">
        <template slot-scope="scope">
          <div>
            <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" class="option" width="250">
        <template slot-scope="scope">
          <div>
            <el-button class="option-1" size="mini" @click="handleEdit(scope.row)">
              <div>编辑</div>
            </el-button>
            <el-popconfirm title="确定删除这个标签吗？" @onConfirm="handleDelete(scope.row._id)">
              <el-button slot="reference" size="mini" type="danger">
                <div>删除</div>
              </el-button>
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
import { addLink, getLinkList, updateLink, deleteLink } from "@/api/link";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 8,
      totalSize: 1,
      openDialog: false,
      formData: {
        id: "",
        name: "",
        url: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.initFriendLink();
  },
  methods: {
    async initFriendLink() {
      const { page, pageSize } = this;
      const res = await getLinkList({ page, pageSize });
      this.tableData = res.data.linkList;
      this.totalSize = res.data.totalSize;
    },
    async createLink() {
      const formData = this.formData;
      let res;
      if (formData.id) {
        res = await updateLink(formData);
      } else {
        res = await addLink(this.formData);
      }
      this.formData = {};
      if (res.status == 0) this.initFriendLink();
      this.openDialog = false;
    },
    async handleEdit(row) {
      this.openDialog = true;
      if (row) this.formData = { id: row._id, name: row.name, url: row.url };
    },
    async handleDelete(id) {
      const res = await deleteLink({ id });
      if (res.status == 0) this.initFriendLink();
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
.FriendLink {
  .table {
    padding: 20px;
    height: 70vh;
  }
  .option-1 {
    margin-right: 10px;
  }
}
</style>