<template>
  <div>
    <h2 class="title">关于我</h2>
    <el-form
      :model="aboutForm"
      label-width="100px"
      @submit.native.prevent="saveAbout"
    >
      <el-form-item label="LOGO :">
        <el-col :span="8">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :http-request="uploadImg"
            :show-file-list="false"
            :header="uploadHeaders"
          >
            <img v-if="aboutForm.logo" :src="aboutForm.logo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>

        <el-col :span="10">
          <el-form-item label="QQ : " prop="name" style="padding-bottom:15px">
            <el-input v-model="aboutForm.qq"></el-input>
          </el-form-item>
          <el-form-item
            label="E-Mail : "
            prop="name"
            style="padding-bottom:15px"
          >
            <el-input v-model="aboutForm.e_mail"></el-input>
          </el-form-item>
          <el-form-item label="Github : " prop="name">
            <el-input v-model="aboutForm.github"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="内容 :" prop="contentMd">
        <v-md-editor
          v-model="text"
          :mode="mode"
          :left-toolbar="toolbar"
          height="400px"
          :disabled-menus="[]"
          @upload-image="handleUploadImage"
          @change="change"
        ></v-md-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixins_upload from "@/utils/mixins_upload";
import { updateAbout, getAboutInfo } from "@/api/about";
import uploadToQiniu from "@/api/qiniuUpload";
export default {
  mixins: [mixins_upload],
  data() {
    return {
      aboutForm: {
        id: "",
        logo: "",
        qq: "",
        e_mail: "",
        github: "",
        contentHtml: "",
        contentMd: ""
      },
      text: "", //
      mode: "editable", //可选值：edit(纯编辑模式) editable(编辑与预览模式) preview(纯预览模式)。
      toolbar:
        "undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
    };
  },
  mounted() {
    this.initAboutInfo();
  },
  methods: {
    async initAboutInfo() {
      const res = await getAboutInfo();
      //使用 Object.assign 合并两个对象 目的 防止 res.data 值为空 导致 aboutForm = null
      if (res.data) {
        this.aboutForm = Object.assign(this.aboutForm, res.data);
        this.aboutForm.id = res.data._id;
        this.text = res.data.contentMd;
      }
    },

    async saveAbout() {
      let id;
      if (this.aboutForm.id) id = this.aboutForm.id;
      const data = await updateAbout({ id: id, about: this.aboutForm });

      if (data.status == 0) this.initAboutInfo();
    },

    async uploadImg(req) {
      const result = await uploadToQiniu(req.file);
      this.aboutForm.logo = result.url;
    },

    async handleUploadImage(event, insertImage, files) {
      const result = await uploadToQiniu(files[0]);
      insertImage({
        url: `${result.url}`,
        desc: "图片哦"
      });
    },
    change(text, html) {
      // 内容变化时触发的事件。text 为输入的内容，html 为解析之后的 html 字符串。
      this.aboutForm.contentMd = text;
      this.aboutForm.contentHtml = html;
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
