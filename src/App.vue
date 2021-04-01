<template>
  <div id="app">
    <keep-alive exclude="Player">
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Player from "@/components/Player";

export default {
  name: 'App',
  components: {
    Player
  },
  methods: {
    touchstart() {
      document.body.addEventListener('touchstart', function () {
        // iphone设置的css伪类：active失效了
        // 解决方法:
        // 在iOS系统的移动设备中，需要在按钮元素或body/html上绑定一个touchstart事件才能激活:active状态。
        // Use the :active pseudo-class in your css, then add ontouchstart="" and onmouseover="" to the body tag.
        // 在您的css中使用:active伪类，然后添加ontouchstart=“”和onmouseover=“”到body标签。
        // <body onTouchStart="" onMouseOver=""></body>
      });
    }
  },
  mounted() {
    this.touchstart();
  },
}
</script>

<style lang="scss" scoped>
@import "../node_modules/vant/lib/index.css";
</style>