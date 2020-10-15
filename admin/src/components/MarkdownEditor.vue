<template>
  <mavon-editor
    class="me-editor"
    ref="md"
    v-model="editor.value"
    @imgAdd="imgAdd"
    v-bind="editor"
    @change="change"
  />
</template>


<script>
//TODO 引入npm install的mavon-editor
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import uploadToQiniu from "@/api/qiniuUpload";

export default {
  name: "MarkdownEditor",
  props: {
    editor: Object
  },
  data() {
    return {};
  },
  mounted() {
    this.$set(this.editor, "ref", this.$refs.md);
  },
  methods: {
    async imgAdd(pos, $file) {
      // let formdata = new FormData();
      // formdata.append("file", $file);
      let file = $file;

      const res = await uploadToQiniu(file);
      console.log(res);
      // if (res.status == 0) {
      //   let _res = res.data;
      //   this.$refs.md.$img2Url(pos, _res.url);
      // }
    },
    change() {
      this.$emit("changeEdit", this.$refs.md.d_render, this.$refs.md.d_value);
    }
  },
  components: {
    mavonEditor
  }
};
</script>
<style scoped>
.me-editor {
  z-index: 6 !important;
  width: 100%;
  height: 100%;
}

.v-note-wrapper.fullscreen {
  top: 60px !important;
}
</style>
