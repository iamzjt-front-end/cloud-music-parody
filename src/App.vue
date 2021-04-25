<template>
  <div id="app">
    <!-- 内容区 -->
    <transition :name="transitionName">
      <keep-alive exclude="RecList,SongListSquare">
        <router-view/>
      </keep-alive>
    </transition>
    <!-- 播放器 -->
    <player></player>
  </div>
</template>

<script>
import Player from "@/components/Player";
import animations from 'create-keyframe-animation';

export default {
  name: 'App',
  components: {
    Player,
  },
  data() {
    return {
      transitionName: 'slide-left' // 默认动画
    };
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
  watch: {
    $route(to, from) {
      //页面切换动画
      // console.log(to)

      const toIndex = to.meta.index
      const fromIndex = from.meta.index

      this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'

      if (to.meta.index == 5) {
        this.$nextTick(() => {
          let animation = {
            0: {
              transform: 'translateY(0)'
            },
            60:{
              transform: 'translateY(-40px)'
            },
            100: {
              transform: 'translateY(-49px)'
            }
          }
          animations.registerAnimation({
            name: 'moveUp',
            animation,
            presets: {
              duration: 400,
              easing: 'linear'
            }
          })
          let miniPlayer = document.querySelector('.mini-player')
          animations.runAnimation(miniPlayer, 'moveUp')
          // animations.unregisterAnimation('moveUp')
          // miniPlayer.style.animation = ''
        })
      } else {
        this.$nextTick(() => {
          let animation = {
            0: {
              transform: 'translateY(-49px)'
            },
            60:{
              transform: 'translateY(-9px)'
            },
            100: {
              transform: 'translateY(0)'
            }
          }
          animations.registerAnimation({
            name: 'moveDown',
            animation,
            presets: {
              duration: 400,
              easing: 'linear'
            }
          })
          let miniPlayer = document.querySelector('.mini-player')
          animations.runAnimation(miniPlayer, 'moveDown')
          setTimeout(function () {
            animations.unregisterAnimation('moveDown')
            miniPlayer.style.animation = ''
          }, 800)
        })
      }
    }
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

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>