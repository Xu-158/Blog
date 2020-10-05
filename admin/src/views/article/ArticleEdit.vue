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
          :headers="uploadHeaders"
          :show-file-list="false"
          :on-success="handleThumbnailSuccess"
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
        <markdown-editor
          :editor="editor"
          class="me-write-editor"
          @changeEdit="changeEdit"
        ></markdown-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import "highlight.js/styles/googlecode.css";
import hljs from "highlight.js";
import {
  getTagList,
  addArticle,
  getArticleInfo,
  updateArticle
} from "@/api/article";
import mixins_upload from "../../utils/mixins_upload";
export default {
  components: { MarkdownEditor },
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
      editor: {
        value: "",
        ref: "", //保存mavonEditor实例  实际不该这样
        default_open: "edit",
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          imagelink: true, // 图片链接
          code: true, // code
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: false, // 清空
          ishljs: true,
          navigation: true, // 导航目录
          preview: true // 预览
        }
      },
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
      this.editor.value = res.data.contentMd;
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

    handleThumbnailSuccess(res) {
      if (res.status == 0) {
        this.$message.success(`${res.msg}`);
        this.articleForm.thumbnail = res.data.url;
      } else {
        this.$message.error(`${res.msg}`);
      }
    },

    changeEdit(html, md) {
      this.articleForm.contentMd = md;
      this.articleForm.contentHtml = html;
      async function highlighthandle() {
        await hljs;
        let highlight = document.querySelectorAll("code,pre");
        highlight.forEach(block => {
          hljs.highlightBlock(block);
        });
      }
      highlighthandle();
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>