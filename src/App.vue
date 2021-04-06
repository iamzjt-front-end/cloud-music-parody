<template>
  <div id="app">
    <!-- 内容区 -->
    <keep-alive>
      <transition name="slide">
        <router-view/>
      </transition>
    </keep-alive>
    <!-- 播放器 -->
    <player></player>
  </div>
</template>

<script>
import Player from "@/components/Player";

export default {
  name: 'App',
  components: {
    Player,
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

#app {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50;

  .slide-enter-active, .slide-leave-active {
    transition: all 0.4s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
}
</style>