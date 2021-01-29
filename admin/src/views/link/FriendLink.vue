<template>
  <div class="FriendLink">
    <el-button
      type="primary"
      class="addDialog"
      plain
      @click="openDialog = true"
    >
      <div><i class="el-icon-circle-plus"></i><span>添加友情链接</span></div>
    </el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="友情链接列表">
        <el-dialog title="信息添加" :visible.sync="openDialog">
          <el-form :model="formData" :rules="rules" ref="formData">
            <el-form-item
              label="链接名称"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input v-model="formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="链接地址"
              :label-width="formLabelWidth"
              prop="url"
            >
              <el-input v-model="formData.url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="链接描述"
              :label-width="formLabelWidth"
              prop="description"
            >
              <el-input
                v-model="formData.description"
                autocomplete="off"
              ></el-input>
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
          <el-table-column
            prop="_id"
            label="编号"
            width="350"
          ></el-table-column>
          <el-table-column prop="title" label="链接名字" width="250">
            <template slot-scope="scope">
              <el-tag @click="openUrl(scope.row)">{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="链接地址">
            <template slot-scope="scope">
              <div>
                <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="连接描述">
            <template slot-scope="scope">
              <div>
                {{ scope.row.description }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" class="option" width="250">
            <template slot-scope="scope">
              <div>
                <el-button
                  class="option-1"
                  size="mini"
                  @click="handleEdit(scope.row)"
                >
                  <div>编辑</div>
                </el-button>
                <el-popconfirm
                  title="确定删除这个标签吗？"
                  @confirm="handleDelete(scope.row._id)"
                >
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
      </el-tab-pane>
    </el-tabs>
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
        url: "",
        description: ""
      },
      formLabelWidth: "120px",
      rules: {
        name: {
          required: true,
          message: "请输入链接名称名称",
          tirgger: "blur"
        },
        url: { required: true, message: "请输入链接URL", tirgger: "blur" },
        description: {
          required: true,
          message: "请输入链接描述",
          tirgger: "blur"
        }
      }
    };
  },
  created() {
    this.initFriendLink();
  },
  methods: {
    openUrl(row) {
      window.open(row.url);
    },
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
      if (row)
        this.formData = {
          id: row._id,
          name: row.name,
          url: row.url,
          description: row.description
        };
    },
    async handleDelete(id) {
      const res = await deleteLink({ id });
      if (res.status == 0) this.initFriendLink();
    },
    // 页数改变
    pageChange(currentPage) {
      this.page = currentPage;
      this.initFriendLink();
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/style/style.scss";
.FriendLink {
  display: flex;
  flex-direction: column;
  .addDialog {
    margin-bottom: 20px;
    .el-icon-circle-plus {
      font-size: 20px;
      vertical-align: sub;
    }
  }
  .option-1 {
    margin-right: 10px;
  }
}
</style>
