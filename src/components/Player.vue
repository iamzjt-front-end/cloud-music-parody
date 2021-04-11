<template>
<div id="player" v-show="playList.length > 0">
  <!-- 播放器正常页面 -->
  <transition name="normal"
              @enter="enter"
              @after-enter="afterEnter"
              @leave="leave"
              @after-leave="afterLeave">
    <div class="normal-player" ref="player" v-show="fullScreen">
      <div class="obscured-glass">
        <div class="top">
          <top-bar>
            <i class="iconfont icon-xiala" slot="left" @click="toMin()"></i>
            <div class="singNmAndSinger" slot="center">
              <div class="songNm">
                <marquee :value="songNm"></marquee>
              </div>
              <div class="singers">
                <marquee :value="singers"></marquee>
              </div>
            </div>
            <i class="iconfont icon-fenxiang" slot="right" @click="toShare()"></i>
          </top-bar>
        </div>
        <!-- 唱片封面 -->
        <div class="record-cover-box">
          <div class="record-cover" ref="recordCover">
            <img :src="albumPicUrl" alt="" :style="{transform: musicRotate}">
          </div>
        </div>
        <div class="bottom">
          <!-- 其他选项 -->
          <div class="other-options">
            <music-operations>
              <i class="iconfont" :class="loveIcon" slot="item1" @click="loveJudge()"></i>
              <i class="iconfont icon-xiazai" slot="item2" @click="songDownload()"></i>
              <i class="iconfont icon-texiao" slot="item3" @click="SpecialEffectsCtrl()"></i>
              <i class="iconfont icon-pinglun" slot="item4" @click="toComment()"></i>
              <i class="iconfont icon-more" slot="item5" @click="toMore()"></i>
            </music-operations>
          </div>
          <!-- 进度条 -->
          <div class="progress-bar-box">
            <div class="start-time">
              <p class="playTime">{{ playTime }}</p>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-cover"></div>
              <div class="little-dot"></div>
            </div>
            <div class="end-time">
              <p>{{ totalTime }}</p>
            </div>
          </div>
          <!-- 播放控制 -->
          <div class="play-control">
            <music-operations>
              <i class="iconfont icon-shunxu" slot="item1" @click="cycleControl()"></i>
              <i class="iconfont icon-shangyiqu" slot="item2" @click="lastSong()"></i>
              <i class="iconfont" :class="playIcon" slot="item3" @click="playJudge()"></i>
              <i class="iconfont icon-xiayiqu" slot="item4" @click="nextSong()"></i>
              <i class="iconfont icon-bofangliebiao" slot="item5" @click="toPlayList()"></i>
            </music-operations>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <!-- 播放器缩小页面 -->
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="toMax()">
      <div class="mini-record-cover-box">
        <div class="mini-record-cover-bg">
          <div class="mini-record-cover">
            <img :src="albumPicUrl" alt="" :style="{transform: musicRotate}">
          </div>
        </div>
      </div>
      <div class="mini-text">
        <h2 class="mini-songNm">{{ songNm }}</h2>
        <p class="mini-singers">- {{ singers }}</p>
      </div>
      <div class="mini-play-control">
        <i class="iconfont" :class="playIcon" slot="item3" @click.stop="playJudge()"></i>
      </div>
      <div class="mini-play-list">
        <i class="iconfont icon-bofangliebiao" slot="item5" @click.stop="toPlayList()"></i>
      </div>
    </div>
  </transition>
  <audio id="audio" ref="audio" :src="currentSongUrl" preload autoplay></audio>
</div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {Toast} from 'vant';
import MusicOperations from "@/components/MusicOperations";
import {mapState, mapGetters, mapMutations} from 'vuex';
import animations from 'create-keyframe-animation';
import Marquee from "components/Marquee";

export default {
  name: "Player",
  components: {
    TopBar,
    MusicOperations,
    Marquee,
  },
  data() {
    return {
      songDet: null, // 歌曲详情
      currentSongUrl: '', // 歌曲url
      songNm: '', // 歌名
      singers: '', // 歌手
      albumPicUrl: '', // 专辑封面
      playTime: '00:00', // 播放时间 - 分秒
      totalTime: '', // 总时间 - 分秒
      isLove: true, // 是否喜欢 false-不喜欢 true-喜欢
      timer: null, // 播放器 setInterval
      musicRotateInit: 0, // 初始化旋转角度
      musicRotate: "rotate(" + 0 + "deg)", // 封面实时旋转角度
      rotateTimer: null, // 旋转 setInterval
    }
  },
  computed: {
    ...mapState(['fullScreen', 'playList', 'currentIndex', 'playingState']),
    ...mapGetters(['currentSong']),
    playIcon() {
      return this.playingState ? 'icon-zanting' : 'icon-bofang';
    },
    loveIcon() {
      return this.isLove ? 'icon-aixin1' : 'icon-aixin2';
    },
  },
  methods: {
    ...mapMutations(['updateCurrentIndex', 'updateFullScreen', 'updatePlayingState']),
    // 歌曲详情获取
    songDetGet(val) {
      let that = this;
      this.$api.player.songDetQry({
        ids: val
      }).then(res => {
        let counter = 0;
        // 对歌手信息进行处理，有的歌曲可能不止一个歌手
        let songData = res.data.songs[0];
        songData.ar.forEach(function (item, index) {
          if (index === 0) {
            songData.ar.singers = item.name;
          } else {
            songData.ar.singers = songData.ar.singers + '/' + item.name;
          }
          counter++;
          if (counter === songData.ar.length) {
            // 等遍历完再进行这里面的操作
            that.songDet = songData;
            that.songNm = songData.name;
            that.singers = songData.ar.singers;
            that.albumPicUrl = songData.al.picUrl;
            // 获取歌曲总时长
            that.totalTime = that.countTime(songData.dt / 1000);
            that.$nextTick(() => {
              that.$refs.player.style = `background-image: url("${that.albumPicUrl}")`;
            })
          }
        });
      })
    },
    // 秒 转为 分秒
    countTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time % 60) + 1;
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds
    },
    // 歌曲url获取
    songUrlGet(val) {
      this.$api.player.songUrlGet({
        id: val
      }).then(res => {
        this.currentSongUrl = res.data.data[0].url;
        // ios autoplay不生效
        // if (this.playingState) {
        //   this.$nextTick(() => {
        //     this.$refs.audio.play();
        //   })
        // }
        this.$store.commit('updatePlayingState', true);
        this.clearTime();
        this.playTimeUpt();
      })
    },
    // 动画钩子
    enter(el, done) {
      const {x, y, scale} = this.getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.recordCover, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.recordCover.style.animation = ''
    },
    leave(el, done) {
      this.$refs.recordCover.style.transition = 'all 0.4s'
      const {x, y, scale} = this.getPosAndScale()
      this.$refs.recordCover.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.recordCover.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.recordCover.style.transition = ''
      this.$refs.recordCover.style.transform = ''
    },
    getPosAndScale() {
      const targetWidth = 28.8
      const paddingLeft = 17.6
      const paddingBottom = 27.2
      const paddingTop = (window.innerHeight * 0.75 - 118) / 2 - window.innerWidth * 0.65 / 2 + 54
      const width = window.innerWidth * 0.65
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    // 最小化
    toMin() {
      this.$store.commit('updateFullScreen', false);
    },
    // 最大化
    toMax() {
      this.$store.commit('updateFullScreen', true);
    },
    // 去往分享
    toShare() {
      Toast('正在开发中...');
    },
    // 喜欢判断
    loveJudge() {
      if (this.isLove === '1') {
        this.isLove = '2';
        // 已添加到我喜欢的音乐

      } else {
        this.isLove = '1';
        // 已取消喜欢

      }
    },
    // 歌曲下载
    songDownload() {
      Toast('正在开发中...');
    },
    // 特效控制
    SpecialEffectsCtrl() {
      Toast('正在开发中...');
    },
    // 进入评论
    toComment() {
      Toast('正在开发中...');
    },
    // 更多操作
    toMore() {
      Toast('正在开发中...');
    },
    // 循环控制
    cycleControl() {
      Toast('正在开发中...');
      // audio 加上 loop属性 就能自动播放
    },
    // 播放
    playJudge() {
      if (!this.playingState) {
        // 暂停状态 ---> 播放状态
        this.$store.commit('updatePlayingState', true);
        this.$refs.audio.play();
        this.playTimeUpt();
      } else {
        // 播放状态 ---> 暂停状态
        this.$store.commit('updatePlayingState', false);
        this.$refs.audio.pause();
        this.clearTime();
      }
    },
    // 播放时间更新 及 进度条更新 及 封面旋转
    playTimeUpt() {
      // 获取 audio
      let audio = document.querySelector('#audio');
      let proBarWidth = document.querySelector('.progress-bar').offsetWidth; // 总进度条长度
      let proBarCover = document.querySelector('.progress-bar-cover'); // 已播放进度条
      let littleDot = document.querySelector('.little-dot');
      let littleDotWidth = document.querySelector('.little-dot').offsetWidth; // 小圆点宽度
      let that = this;
      // 进度条 定时器
      this.timer = setInterval(function () {
        that.playTime = that.countTime(audio.currentTime); // 当前播放时长
        littleDot.style.left = ((audio.currentTime / audio.duration) * proBarWidth - littleDotWidth / 2) + 'px';
        proBarCover.style.width = (audio.currentTime / audio.duration) * proBarWidth + 'px';
      }, 1000);
      // 封面旋转 定时器
      this.rotateTimer = setInterval(function () {
        that.musicRotateInit = that.musicRotateInit + 0.05;
        that.musicRotate = "rotate(" + that.musicRotateInit + "deg)";
      }, 1);
    },
    // 清除进度条 及 封面旋转 定时器
    clearTime() {
      clearInterval(this.timer);
      clearInterval(this.rotateTimer);
    },
    // 上一曲
    lastSong() {
      let index = this.currentIndex;
      index--;
      if (index < 0) {
        this.$store.commit('updateCurrentIndex', this.playList.length - 1);
      } else {
        this.$store.commit('updateCurrentIndex', index);
      }
    },
    // 下一曲
    nextSong() {
      let index = this.currentIndex;
      index++;
      if (index > this.playList.length - 1) {
        this.$store.commit('updateCurrentIndex', 0);
      } else {
        this.$store.commit('updateCurrentIndex', index);
      }
    },
    // 播放列表
    toPlayList() {

    },
  },
  watch: {
    currentSong: {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.songDetGet(this.currentSong.id);
          this.songUrlGet(this.currentSong.id);
        }
      }
    },
    playTime: {
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue && this.playTime == this.totalTime) {
          this.nextSong();
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixin";

$width-cover: 65vw;

#player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0)
      }

      .bottom {
        transform: translate3d(0, 100px, 0)
      }
    }

    .obscured-glass {
      width: 100%;
      height: 100%;
      backdrop-filter: blur(66px);
    }

    .top-bar {
      box-shadow: none;

      .icon-xiala, .icon-fenxiang {
        font-size: 1.25rem;
      }
    }

    .singNmAndSinger {
      width: 100%;
      height: 100%;
      margin-top: 0.5rem;
      padding: 0 0.8rem;

      .songNm, .singers {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .songNm {
        height: 50%;
        font-size: 1.2rem;
        color: #ffffff;
      }

      .singers {
        height: 30%;
        font-size: 0.7rem;
        color: #deddde;
      }
    }

    .record-cover-box {
      width: 100%;
      height: calc(100vh - 54px - 10vh - 4rem - 15vh);
      //position: relative;
      display: flex;

      .record-cover {
        width: $width-cover;
        height: $width-cover;
        background-color: #fff;
        border-radius: 50%;
        margin: auto;
        //position: absolute;
        //top: 20%;
        //left: 17.5%;
        //transform: translate(-50%, -50%);
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .other-options {
      width: 95%;
      height: 10vh;
      margin: 0 auto;

      .icon-aixin2 {
        color: #eb4d44;
      }
    }

    .progress-bar-box {
      width: 95%;
      height: 4rem;
      display: flex;
      align-items: center;
      margin: 0 auto;

      .start-time, .end-time {
        width: 2.5rem;
        height: 4rem;
        line-height: 4rem;

        p {
          font-size: 0.7rem;
          opacity: 0.5;
        }
      }

      .start-time {
        text-align: left;
      }

      .end-time {
        text-align: right;
      }

      .progress-bar {
        flex: 1;
        height: 1.5px;
        border-radius: 0.75px;
        background-color: rgba(255, 255, 255, 0.3);
        position: relative;

        .progress-bar-cover {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: rgba(255, 255, 255, 0.4);
          z-index: 10;
        }

        //&:active {
        //  height: 0.22rem;
        //  border-radius: 0.11rem;
        //}
      }

      .little-dot {
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 5px;
        position: absolute;
        top: -4px;
        left: -5px;
        z-index: 20;

        //&:active {
        //  width: 1rem;
        //  height: 1rem;
        //  border-radius: 0.5rem;
        //  position: relative;
        //  top: -0.4rem;
        //  left: -0.5rem;
        //}
      }
    }

    .play-control {
      width: 95%;
      height: 15vh;
      margin: 0 auto;

      .icon-bofang, .icon-zanting {
        font-size: 3.2rem;
      }

      i {
        top: 35%;
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 2.8rem;
    border-top: 1px solid #e3e3e3;
    background-color: #fdfdfd;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .mini-record-cover-box {
      width: 20%;
      height: 100%;
      position: relative;

      .mini-record-cover-bg {
        width: 2.8rem;
        height: 2.8rem;
        background-color: black;
        border-radius: 50%;
        position: absolute;
        top: -0.3rem;
        left: 2.5rem;
        transform: translateX(-50%);

        .mini-record-cover {
          width: 1.8rem;
          height: 1.8rem;
          background-color: pink;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .mini-text {
      width: 54%;
      height: 100%;
      display: flex;
      align-items: center;

      .mini-songNm {
        width: 60%;
        color: #323233;
        font-size: 0.9rem;
        padding: 0 0.3rem;
        @include single-line-ellipsis;
      }

      .mini-singers {
        width: 35%;
        color: #838384;
        font-size: 0.7rem;
        @include single-line-ellipsis;
      }
    }

    .mini-play-control,
    .mini-play-list {
      width: 13%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mini-play-control {
      .icon-bofang, .icon-zanting {
        font-size: 1.6rem;
        color: #323333;
      }
    }

    .mini-play-list {
      .icon-bofangliebiao {
        font-size: 1.35rem;
        color: #323333;
      }
    }
  }
}
</style>