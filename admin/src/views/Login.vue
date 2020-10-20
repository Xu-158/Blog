<template>
  <div class="login">
    <el-card header="账号登录" class="login-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="ruleForm.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-row">
          <el-button type="primary" @click="submitForm" :loading="loading">
            <span style="color:white;font-weight:600">账号&nbsp;</span>
            <span class="iconfont" style="color:white;font-size:20px"
              >&#xe8b7;</span
            >
          </el-button>
          <el-button type="info" @click="toGithub" :loading="githubLoading">
            <span style="color:black;font-weight:600">Github&nbsp;</span>
            <span class="iconfont" style="color:black;font-size:20px"
              >&#xea0a;</span
            >
          </el-button>
          <el-button type="warning" @click="tourisLogin">
            <span style="color:#752;font-weight:600">游客&nbsp;</span>
            <span class="iconfont" style="color:#863;font-size:20px"
              >&#xe679;</span
            >
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login, tourisLogin, githubLogin } from "@/api/login";
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
    this.code = window.location.search.split("=").pop() || ""; //?code=88680366fd3e8fc28767 截取Code
    if (this.code) {
      this.githubLoading = true;
      this.githubLogin(this.code);
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
      this.$loading.show();
      const res = await login({ account, password });
      this.setSessionStorage(res);
    },

    async tourisLogin() {
      this.$loading.show();
      const res = await tourisLogin();
      this.setSessionStorage(res);
    },

    toGithub() {
      this.githubLoading = true;
      this.$loading.show();
      const url = process.env.VUE_APP_GITHUB_LOGIN_URL;
      window.location.href = url;
    },

    // 认证  github
    async githubLogin(code) {
      const res = await githubLogin({ code: code });
      if (res.status == 1) {
        this.$message.error(res.msg);
        this.$loading.hide();
        return;
      }
      sessionStorage.setItem("info", JSON.stringify(res.data));
      this.setSessionStorage(res);
    },

    setSessionStorage(res) {
      if (res) {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("account", res.data.account);
      }
      this.$router.push("/");
      this.$loading.hide();
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

.login {
  height: 100vh;
  background-image: linear-gradient(
    150deg,
    rgb(18, 129, 202),
    rgba(210, 245, 85, 0.61)
  );
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    animation: animate 10s linear infinite;
    margin: 0 auto;
    width: 30%;
    .btn-row {
      display: flex;
      justify-content: space-around;
    }
  }
}

@media (max-width: 1024px) {
  .login {
    .login-card {
      width: 90%;
      margin: 0 auto;
      .btn-row {
        width: 100%;
        .el-button {
          margin: 0 auto;
          width: 10rem;
        }
      }
    }
  }
}
</style>
