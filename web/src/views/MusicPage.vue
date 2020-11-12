<template>
  <div class="about">
    <debounce-comp name="xjf" :Switch="true" :delay="400">
      <span>防抖测试</span><input type="text" @input="test" />
    </debounce-comp>
    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      width="330"
      height="86"
      src="//music.163.com/outchain/player?type=2&id=1449782341&auto=1&height=66"
    ></iframe>
  </div>
</template>

<script>
import DebounceComp from "@c/DebounceComp.js";
export default {
  components: {
    DebounceComp
  },
  data() {
    return {
      timer: null
    };
  },
  methods: {
    test(event) {
      console.log(event.target.value);
    }
  }
};
</script>
