<template>
  <div class="AdminList">
    <el-button type="primary addDialog" plain @click="openDialog = true">
      <div><i class="el-icon-circle-plus"></i><span> 添加管理员</span></div>
    </el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="管理员列表">
        <el-table class="table" :data="tableData" v-if="tableData">
          <el-table-column
            prop="_id"
            label="编号"
            width="350"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="250"
          ></el-table-column>
          <el-table-column prop="role.type" label="类型"></el-table-column>
          <el-table-column label="操作" class="option" width="250">
            <template slot-scope="scope">
              <div>
                <el-popconfirm
                  title="确定删除该管理员吗?"
                  @onConfirm="handleDelete(scope.row._id)"
                >
                  <el-button slot="reference" size="mini" type="danger">
                    <div>删除</div>
                  </el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-dialog title="信息添加" :visible.sync="openDialog">
        <el-form :model="formData">
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="formData.role" autocomplete="off">
              <el-option
                v-for="item in roleList"
                :key="item._id"
                :label="item.type"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名字" :label-width="formLabelWidth">
            <el-input v-model="formData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="formData.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="formData.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openDialog = false">取 消</el-button>
          <el-button type="primary" @click="createAdmin">
            <div>确 定</div>
          </el-button>
        </div>
      </el-dialog>
    </el-tabs>
  </div>
</template>

<script>
import {
  getAdminList,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getRoleList
} from "@/api/admin";
export default {
  data() {
    return {
      tableData: [],
      openDialog: false,
      formData: {
        id: "",
        role: "",
        name: "",
        account: "",
        password: ""
      },
      formLabelWidth: "120px",
      roleList: []
    };
  },
  created() {
    this.initAdminList();
    this.initRoleList();
  },
  methods: {
    async initAdminList() {
      const res = await getAdminList();
      this.tableData = res.data;
    },
    async initRoleList() {
      const res = await getRoleList();
      this.roleList = res.data;
    },

    async createAdmin() {
      const formData = this.formData;
      let res;
      if (formData.id) {
        res = await updateAdmin(formData);
      } else {
        res = await addAdmin(this.formData);
      }
      this.formData = {};
      if (res.status == 0) this.initAdminList();
      this.openDialog = false;
    },

    async handleDelete(id) {
      const res = await deleteAdmin({ id });
      if (res.status == 0) this.initAdminList();
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/style/style.scss";
.AdminList {
  display: flex;
  flex-direction: column;
  .addDialog{
    margin-bottom: 20px;
    .el-icon-circle-plus{
      font-size: 20px;
      vertical-align: sub;
    }
  }
  .option-1 {
    margin-right: 10px;
  }
}
</style>
