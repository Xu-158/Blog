<template>
  <div>
    <h2 class="title">{{id?'编辑':'新建'}}文章</h2>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="文章标题 :">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章类型 :">
        <el-checkbox-group v-if="tagList" v-model="articleForm.tags" size="medium">
          <el-checkbox-button v-for="tag in tagList" :label="tag._id" :key="tag._id">{{tag.title}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="设置热门 :">
        <el-switch v-model="articleForm.hot" active-color="#13ce66" inactive-color="#666"></el-switch>
      </el-form-item>
      <el-form-item label="文章内容 :">
        <markdown-editor :editor="articleForm.editor" class="me-write-editor"></markdown-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import { getTagList } from "@/api/article";
export default {
  components: { MarkdownEditor },
  props: {
    id: { type: String }
  },
  data() {
    return {
      tagList: [],
      articleForm: {
        title: "",
        tags: [],
        hot: false,
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
            trash: true, // 清空
            navigation: true, // 导航目录
            // subfield: true, // 单双栏模式
            preview: true // 预览
          }
        }
      },
      value: "ddddddddd"
    };
  },
  created() {
    this.getTag();
  },
  methods: {
    async getTag() {
      const res = await getTagList({ page: 1, pageSize: 999 });
      this.tagList = res.data.tagList;
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
</style>