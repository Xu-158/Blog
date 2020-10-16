<template>
  <v-md-editor
    v-model="text"
    :mode="mode"
    :left-toolbar="toolbar"
    height="400px"
    :disabled-menus="[]"
    @upload-image="handleUploadImage"
    @change="change"
  ></v-md-editor>
</template>

<script>
import uploadToQiniu from "@/api/qiniuUpload";
export default {
  data() {
    return {
      text: "", //
      mode: "editable", //可选值：edit(纯编辑模式) editable(编辑与预览模式) preview(纯预览模式)。
      toolbar:
        "undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code "
    };
  },
  methods: {
    async handleUploadImage(event, insertImage, files) {
      const result = await uploadToQiniu(files[0]);
      insertImage({
        url: `${result.url}`,
        desc: "图片哦"
      });
    },
    change(text, html) {
      console.log('html: ', html);
      console.log('text: ', text);
      // 内容变化时触发的事件。text 为输入的内容，html 为解析之后的 html 字符串。
    }
  }
};
</script>

<style>
</style>