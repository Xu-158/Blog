<template>
  <el-button @click="audioClick" icon="el-icon-video-play" type="primary">
    <audio
      autoplay
      :src="src"
      @click="audioClick"
      loop
      :volume="volume"
    ></audio>
    <span v-show="!src">音乐</span>
    <span>{{ src | regName }}</span>
    <div>
      <el-slider
        v-model="volume"
        :step="1"
        :max="100"
        @change="volumeChange"
        input-size="mini"
        height="100"
      >
      </el-slider>
    </div>
  </el-button>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      volume: 30,
      audio: "",
    };
  },
  mounted() {
    this.audio = this.$el.querySelector("audio");
    this.volumeChange();
  },
  methods: {
    audioClick() {
      this.$router.push("/system/sourceList?activeName=music");
    },
    volumeChange(value) {
      this.audio.volume = this.volume / 100;
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
.el-slider__bar {
  background-color: #666666;
}
</style>