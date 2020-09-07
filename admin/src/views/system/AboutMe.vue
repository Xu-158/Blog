<template>
  <div>
    <h2 class="title">关于我</h2>
    <el-form
      :model="aboutForm"
      label-width="100px"
      @submit.native.prevent="saveAbout"
    >
      <el-form-item label="LOGO :">
        <el-col :span="4">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="handleThumbnailSuccess"
          >
            <img v-if="aboutForm.logo" :src="aboutForm.logo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>

        <el-col :span="11">
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
import mixins_upload from "@/utils/mixins_upload";
import { updateAbout, getAboutInfo } from "@/api/about";
export default {
  components: { MarkdownEditor },
  mixins: [mixins_upload],
  data() {
    return {
      aboutForm: {
        _id: "",
        logo: "",
        qq: "",
        e_mail: "",
        github: "",
        contentHtml: "",
        contentMd: ""
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
      }
    };
  },
  beforeMount() {
    this.initAboutInfo();
  },
  methods: {
    async initAboutInfo() {
      const res = await getAboutInfo();
      //使用 Object.assign目的 防止 res.data 值为空 导致 aboutForm = null
      //使用 Object.assign 合并两个对象
      this.aboutForm = Object.assign(this.aboutForm, res.data);
      this.aboutForm._id = res.data;
      this.editor.value = res.data.contentMd;
    },

    async saveAbout() {
      let id, data, about;
      if (this.aboutForm._id) id = this.aboutForm._id;
      about = this.aboutForm;
      console.log(id, about);
      data = await updateAbout({ id: id, about: about });
      if (data.status == 0) this.initAboutInfo();
    },

    handleThumbnailSuccess(res) {
      if (res.status == 0) {
        this.$message.success(`${res.msg}`);
        this.$set(this.aboutForm, "logo", res.data.url);
      } else {
        this.$message.error(`${res.msg}`);
      }
    },

    changeEdit(html, md) {
      this.aboutForm.contentMd = md;
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
