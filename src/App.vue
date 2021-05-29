<template>
  <div id="app">
    <!-- 内容区 -->
    <transition :name="transitionName">
      <keep-alive exclude="RecList,SongListSquare,RankList,Charts,VideoPlay">
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
import {mapState} from "vuex";

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
  computed: {
    ...mapState(['fullScreen']),
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
    },
    // tag-content 高度更新
    tagContentHupt(ele, high) {
      let tagContents = document.querySelectorAll(ele);
      tagContents.forEach(item => {
        item.style.height = high;
      })
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

      if (from.meta.index > 5 && to.meta.index == 5) { // 从高页面到低页面  上移 （视频播放页 特殊情况）
        if (from.meta.title == '视频播放') {
          this.$nextTick(() => {
            let animation = {
              0: {
                transform: 'translateY(50px)'
              },
              60: {
                transform: 'translateY(-25px)'
              },
              100: {
                transform: 'translateY(-49px)'
              }
            }
            animations.registerAnimation({
              name: 'moveUpSpec',
              animation,
              presets: {
                duration: 400,
                easing: 'linear'
              }
            })
            let miniPlayer = document.querySelector('.mini-player')
            animations.runAnimation(miniPlayer, 'moveUpSpec')
            // animations.unregisterAnimation('moveUp')
            // miniPlayer.style.animation = ''
          })
        } else {
          this.$nextTick(() => {
            let animation = {
              0: {
                transform: 'translateY(0)'
              },
              60: {
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
        }
      } else if (to.meta.index > 5 && from.meta.index == 5) { // 从低页面到高页面  下移 （视频播放页 特殊情况）
        if (to.meta.title == '视频播放') {
          this.$nextTick(() => {
            let animation = {
              0: {
                transform: 'translateY(-49px)'
              },
              60: {
                transform: 'translateY(25px)'
              },
              100: {
                transform: 'translateY(50px)'
              }
            }
            animations.registerAnimation({
              name: 'moveDownSpec',
              animation,
              presets: {
                duration: 400,
                easing: 'linear'
              }
            })
            let miniPlayer = document.querySelector('.mini-player')
            animations.runAnimation(miniPlayer, 'moveDownSpec')
            // setTimeout(function () {
            //   animations.unregisterAnimation('moveDownSpec')
            //   miniPlayer.style.animation = ''
            // }, 800)
          })
        } else {
          this.$nextTick(() => {
            let animation = {
              0: {
                transform: 'translateY(-49px)'
              },
              60: {
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

      // 动态设置 content 内容区
      let player = document.querySelector('#player');
      if (player.style.display != 'none' && !this.fullScreen) {
        // 发现模块
        if (to.name == 'found') {
          this.$nextTick(() => {
            let foundContent = document.querySelector('.found-content');
            foundContent.style.bottom = 'calc(50px + 2.8rem)';
            foundContent.style.height = 'calc(100vh - 54px - 50px - 2.8rem)';
            this.$bus.$emit('BScrollRefresh');
          })
        }
        // 我的模块
        if (to.name == 'mine') {
          this.$nextTick(() => {
            let mineContent = document.querySelector('.mine-content');
            mineContent.style.bottom = 'calc(50px + 2.8rem)';
            mineContent.style.height = 'calc(100vh - 54px - 50px - 2.8rem)';
            this.$bus.$emit('BScrollRefresh');
          })
        }
        // 云村模块
        if (to.name == 'cloud-villlage') {
          this.$nextTick(() => {
            let cloudVillageSquare = document.querySelector('.cloud-village-square');
            cloudVillageSquare.style.bottom = 'calc(50px + 2.8rem)';
            cloudVillageSquare.style.height = 'calc(100vh - 54px - 50px - 2.8rem)';
            this.tagContentHupt('.tag-content', 'calc(100vh - 54px - 44px - 50px - 2.8rem)');
            this.$bus.$emit('BScrollRefresh');
          })
          this.$bus.$on('videoListUpt', () => {
            this.$nextTick(() => {
              this.tagContentHupt('.tag-content', 'calc(100vh - 54px - 44px - 50px - 2.8rem)');
              this.$bus.$emit('BScrollRefresh');
            })
          })
        }
        // 歌单广场
        if (to.name == 'song-list-square') {
          this.$nextTick(() => {
            let songListSquare = document.querySelector('.song-list-square-content');
            songListSquare.style.bottom = '2.8rem';
            songListSquare.style.height = 'calc(100vh - 54px - 2.8rem)';
            this.tagContentHupt('.tag-content', 'calc(100vh - 54px - 44px - 2.8rem)');
            this.$bus.$emit('BScrollRefresh');
          })
          this.$bus.$on('songSquareUpt', () => {
            this.$nextTick(() => {
              this.tagContentHupt('.tag-content', 'calc(100vh - 54px - 44px - 2.8rem)');
              this.$bus.$emit('BScrollRefresh');
            })
          })
        }
        // 排行榜
        if (to.name == 'charts') {
          this.$nextTick(() => {
            let chartsContent = document.querySelector('.charts-content');
            chartsContent.style.bottom = '2.8rem';
            chartsContent.style.height = 'calc(100vh - 54px - 2.8rem)';
            this.$bus.$emit('BScrollRefresh');
          })
        }
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
    //opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    //opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    //opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    //opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>