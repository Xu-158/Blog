<template>
  <div class="AdminList">
    <el-button type="primary" plain @click="openDialog = true">
      <div>新建管理员</div>
    </el-button>

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

    <el-table class="table" :data="tableData" v-if="tableData">
      <el-table-column prop="_id" label="编号" width="350"></el-table-column>
      <el-table-column prop="name" label="名称" width="250"></el-table-column>
      <el-table-column prop="role.type" label="类型" width="250"></el-table-column>
      <el-table-column label="操作" class="option" width="250">
        <template slot-scope="scope">
          <div>
            <el-popconfirm title="确定删除这个标签吗？" @onConfirm="handleDelete(scope.row._id)">
              <el-button slot="reference" size="mini" type="danger">
                <div>删除</div>
              </el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAdminList, addAdmin, updateAdmin, deleteAdmin } from "@/api/admin";
import { addRole, getRoleList } from "@/api/role";
//  deleteRole addRole,
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
      if (this.roleList == 0) {
        await addRole([
          {
            type: "Tourist"
          },
          {
            type: "Admin"
          }
        ]);
      }
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
  .table {
    padding: 20px;
    height: 70vh;
  }
  .option-1 {
    margin-right: 10px;
  }
}
</style>
