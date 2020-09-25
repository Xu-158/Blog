<template>
  <div class="login">
    <el-card header="账号登录" class="login-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btn-row">
          <el-button type="primary" @click="submitForm" :loading="loading">
            <span style="color:white;font-weight:600">账号&nbsp;</span>
            <span class="iconfont" style="color:white;font-size:20px">&#xe8b7;</span>
          </el-button>
          <el-button type="info" @click="githubLogin" :loading="githubLoading">
            <span style="color:black;font-weight:600">Github&nbsp;</span>
            <span class="iconfont" style="color:black;font-size:20px">&#xea0a;</span>
          </el-button>
          <el-button type="warning" @click="tourisLogin">
            <span style="color:#752;font-weight:600">游客&nbsp;</span>
            <span class="iconfont" style="color:#863;font-size:20px">&#xe679;</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login, tourisLogin, githubLogin, checkoAuth } from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      code: "", //git认证code
      githubLoading: false
    };
  },
  created() {
    this.code = window.location.search || "";
    if (this.code) {
      this.githubLoading = true;
      this.checkoAuth(this.code);
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) this.loginF();
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
      this.$loading.show();
      const res = await tourisLogin();
      localStorage.setItem("token", res.token);
      localStorage.setItem("account", res.data.account);
      this.$loading.hide();
      this.$router.push("/");
    },

    //  获取 github 认证 code
    async githubLogin() {
      this.githubLoading = true;
      this.$loading.show();
      const res = await githubLogin();
      if (!res) return;
      const url = res.data.attestUrl + res.data.client_id;
      window.location.href = url;
    },

    // 把 code 发到服务端获取 token 及用户信息
    async checkoAuth(code) {
      const res = await checkoAuth({ code: code });
      if (res.status == 1) {
        this.$message.error(res.msg);
        this.$loading.hide();
        return;
      }
      localStorage.setItem("info", JSON.stringify(res.data));
      localStorage.setItem("token", res.token);
      localStorage.setItem("account", res.data.name);
      this.$loading.hide();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont";
  src: url("../assets/font/iconfont.eot");
  src: url("../assets/font/iconfont.eot?#iefix") format("embedded-opentype"),
    url("../assets/font/iconfont.woff2") format("woff2"),
    url("../assets/font/iconfont.woff") format("woff"),
    url("../assets/font/iconfont.ttf") format("truetype"),
    url("../assets/font/iconfont.svg#iconfont") format("svg");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.login-card {
  width: 30%;
  margin: 10rem auto;
}
.btn-row {
  display: flex;
  justify-content: space-around;
}
</style>
