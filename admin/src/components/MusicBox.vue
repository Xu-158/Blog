<template>
  <el-button @click="audioClick" icon="el-icon-video-play" type="primary">
    <audio autoplay :src="src" @click="audioClick" loop></audio>
    <span v-show="!src">音乐</span>
    <span>{{ src | regName }}</span>
  </el-button>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    audioClick() {
      this.$router.push("/system/sourceList?activeName=music");
    },
  },
  computed: mapState({
    src: (state) => state.playUrl,
  }),
  filters: {
    regName(url) {
      let name = url.split("/").pop();
      let endIndex = name.indexOf(".mp3");
      return name.slice(0, endIndex);
    },
  },
};
</script>

<style>
</style>