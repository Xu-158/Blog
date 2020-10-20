<template>
  <div>
    <h2 class="title">{{ id ? "编辑" : "新建" }}文章</h2>
    <el-form
      :model="articleForm"
      ref="articleForm"
      :rules="rules"
      label-width="100px"
      @submit.native.prevent="saveArticle"
    >
      <el-form-item label="文章标题 :" prop="title">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章类型 :" prop="tags">
        <el-checkbox-group
          v-if="tagList"
          v-model="articleForm.tags"
          size="medium"
        >
          <el-checkbox-button
            v-for="tag in tagList"
            :label="tag._id"
            :key="tag._id"
            >{{ tag.title }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="设置置顶 :">
        <el-switch
          v-model="articleForm.isTop"
          active-color="#13ce66"
          inactive-color="#666"
        ></el-switch>
        <span style="padding-left:40px;color:#606266">设置可见 :&nbsp;</span>
        <el-switch
          v-model="articleForm.isShow"
          active-color="#13ce66"
          inactive-color="#666"
        ></el-switch>
      </el-form-item>
      <el-form-item label="封 面 :">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :http-request="uploadImg"
          :show-file-list="false"
          :header="uploadHeaders"
        >
          <img
            v-if="articleForm.thumbnail"
            :src="articleForm.thumbnail"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容 :" prop="contentMd">
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
import {
  getTagList,
  addArticle,
  getArticleInfo,
  updateArticle
} from "@/api/article";
import mixins_upload from "@/utils/mixins_upload";
import uploadToQiniu from "@/api/qiniuUpload";

export default {
  mixins: [mixins_upload],
  props: {
    id: { type: String }
  },
  data() {
    return {
      tagList: [],
      articleForm: {
        title: "",
        tags: [],
        thumbnail: "",
        isTop: false,
        isShow: false,
        contentMd: "",
        contentHtml: ""
      },
      text: "", //
      mode: "editable", //可选值：edit(纯编辑模式) editable(编辑与预览模式) preview(纯预览模式)。
      toolbar:
        "undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code",
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        tags: [
          { required: true, message: "请选择文章标签", trigger: "change" }
        ],
        contentMd: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getTag();
    this.id && this.getArticle();
  },
  methods: {
    async getTag() {
      const res = await getTagList({ page: 1, pageSize: 999 });
      this.tagList = res.data.tagList;
    },

    async getArticle() {
      const res = await getArticleInfo({ id: this.id });
      this.articleForm = res.data;
      this.text = res.data.contentMd;
    },

    saveArticle() {
      let id, res;
      id = this.id;
      this.$refs.articleForm.validate(async valid => {
        if (!valid) {
          this.$message.error("填写错误，请检查!");
          return;
        } else {
          if (id) {
            res = await updateArticle({
              id: this.id,
              article: this.articleForm
            });
          } else {
            res = await addArticle({ article: this.articleForm });
          }
          if (res.status === 0) this.$router.push("/article/ArticleList");
        }
      });
    },

    async uploadImg(req) {
      const type = ["png", "jpg", "jpeg", "gif"];
      if (type.indexOf(req.file.type.split("/").pop()) < 0) {
        this.$message.error('只支持上传 "png", "jpg", "jpeg", "gif" 类型文件');
        return;
      }
      const result = await uploadToQiniu(req.file);
      this.articleForm.thumbnail = result.url;
    },

    async handleUploadImage(event, insertImage, files) {
      const type = ["png", "jpg", "jpeg", "gif"];
      if (type.indexOf(files[0].type.split("/").pop()) < 0) {
        this.$message.error('只支持上传 "png", "jpg", "jpeg", "gif" 类型文件');
        return;
      }
      const result = await uploadToQiniu(files[0]);
      insertImage({
        url: `${result.url}`,
        desc: "图片哦"
      });
    },
    change(text, html) {
      // 内容变化时触发的事件。text 为输入的内容，html 为解析之后的 html 字符串。
      this.articleForm.contentMd = text;
      this.articleForm.contentHtml = html;
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>