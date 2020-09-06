<template>
  <div class="login">
    <el-card header="请先登录" class="login-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btn-row">
          <el-button type="primary" @click="submitForm" :loading="loading">登陆</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
          <el-button type="warning" @click="tourisLogin">游客登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login, tourisLogin } from "@/api/login";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      ruleForm: {
        account: "admin",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },

    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loginF();
        }
      });
    },

    async loginF() {
      const { account, password } = this.ruleForm;
      this.loading = true;
      const res = await login({ account, password });
      this.loading = false;
      if (res.status == 1) return;
      localStorage.setItem("token", res.token);
      localStorage.setItem("account", res.data.account);

      this.$router.push("/");
    },

    async tourisLogin() {
      const res = await tourisLogin();
      localStorage.setItem("token", res.token);
      localStorage.setItem("account", res.data.account);
      this.$router.push("/");
    }
  }
};
</script>

<style>
.login-card {
  width: 30%;
  margin: 10rem auto;
}
.btn-row {
  display: flex;
  justify-content: space-around;
}
</style>