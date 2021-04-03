<template>
<div id="player" v-show="playList.length > 0">
  <!-- 播放器正常页面 -->
  <div class="normal-player" ref="player" v-show="fullScreen">
    <div class="obscured-glass">
      <top-bar>
        <i class="iconfont icon-xiala" slot="left" @click="back()"></i>
        <div class="singNmAndSinger" slot="center">
          <h1>{{ songNm }}</h1>
          <p>{{ singers }}</p>
        </div>
        <i class="iconfont icon-fenxiang" slot="right" @click="toShare()"></i>
      </top-bar>
      <!-- 唱片封面 -->
      <div class="record-cover-box">
        <div class="record-cover">
          <img :src="albumPicUrl" alt="">
        </div>
      </div>
      <!-- 其他选项 -->
      <div class="other-options">
        <music-operations>
          <i class="iconfont" :class="`icon-aixin${isLove}`" slot="item1" @click="loveJudge()"></i>
          <i class="iconfont icon-xiazai" slot="item2" @click="songDownload()"></i>
          <i class="iconfont icon-texiao" slot="item3" @click="SpecialEffectsCtrl()"></i>
          <i class="iconfont icon-pinglun" slot="item4" @click="toComment()"></i>
          <i class="iconfont icon-more" slot="item5" @click="toMore()"></i>
        </music-operations>
      </div>
      <!-- 进度条 -->
      <div class="progress-bar-box">
        <div class="start-time">
          <p>{{ playTimeM }}:{{ playTimeS }}</p>
        </div>
        <div class="progress-bar">
          <div class="little-dot"></div>
        </div>
        <div class="end-time">
          <p>{{ totalTimeM }}:{{ totalTimeS }}</p>
        </div>
      </div>
      <!-- 播放控制 -->
      <div class="play-control">
        <music-operations>
          <i class="iconfont icon-shunxu" slot="item1" @click="cycleControl()"></i>
          <i class="iconfont icon-shangyiqu" slot="item2" @click="lastSong()"></i>
          <i class="iconfont" :class="`icon-${isPlay}`" slot="item3" @click="playJudge()"></i>
          <i class="iconfont icon-xiayiqu" slot="item4" @click="nextSong()"></i>
          <i class="iconfont icon-bofangliebiao" slot="item5" @click="toPlayList()"></i>
        </music-operations>
      </div>
    </div>
  </div>
  <!-- 播放器缩小页面 -->
  <div class="mini-player" v-show="!fullScreen">

  </div>
</div>
</template>

<script>
import TopBar from "@/components/TopBar";
import MusicOperations from "@/components/MusicOperations";
import {mapState, mapGetters} from 'vuex';
import {Toast} from 'vant';

export default {
  name: "Player",
  components: {
    TopBar,
    MusicOperations,
  },
  data() {
    return {
      songDet: null, // 歌曲详情
      songNm: '', // 歌名
      singers: '', // 歌手
      albumPicUrl: '', // 专辑封面
      playTimeM: '00', // 播放时间 - 分
      playTimeS: '00', // 播放时间 - 秒
      totalTimeM: '', // 总时间 - 分
      totalTimeS: '', // 总时间 - 秒
      originalPath: '', // 跳转过来的页面的路径
      isLove: '1', // 是否喜欢 1-不喜欢 2-喜欢
      isPlay: 'bofang', // 是否正在播放 默认是播放按钮,点击播放
    }
  },
  computed: {
    ...mapState(['fullScreen', 'playList', 'currentIndex']),
    ...mapGetters(['currentSong']),
  },
  methods: {
    // 歌曲详情获取
    SongDetGet(val) {
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
            // 获取歌曲时长
            that.totalTimeM = that.$moment(songData.dt).minutes();
            that.totalTimeS = that.$moment(songData.dt).seconds();
            if (that.totalTimeM < 10) {
              that.totalTimeM = '0' + that.totalTimeM;
            }
            if (that.totalTimeS < 10) {
              that.totalTimeS = '0' + that.totalTimeS;
            }
            that.$nextTick(() => {
              that.$refs.player.style = `background-image: url("${that.albumPicUrl}")`;
            })
          }
        });
      })
    },
    // 返回
    back() {
      this.$router.push({path: this.originalPath});
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
        this.$notify('已添加到我喜欢的音乐');
      } else {
        this.isLove = '1';
        // 已取消喜欢
        this.$notify({
          message: '已取消喜欢',
          color: '#ad0000',
          background: '#ffe1e1',
        });
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
    },
    // 播放
    playJudge() {
      if (this.isPlay === 'bofang') {
        // 暂停状态 ---> 播放状态
        this.isPlay = 'zanting';
        console.log('播放');
      } else {
        // 播放状态 ---> 暂停状态
        this.isPlay = 'bofang';
        console.log('暂停');
      }
    },
    // 上一曲
    lastSong() {

    },
    // 下一步
    nextSong() {

    },
    // 播放列表
    toPlayList() {

    },
  },
  created() {
    this.SongDetGet(this.currentSong.id);
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
$width-cover: 30vh;

#player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;

  .normal-player {
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

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

      h1, p {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 2rem;
      }

      h1 {
        height: 50%;
        font-size: 1.2rem;
        color: #ffffff;
      }

      p {
        height: 30%;
        font-size: 0.7rem;
        color: #deddde;
      }
    }

    .record-cover-box {
      width: 100%;
      height: calc(100vh - 54px - 10vh - 4rem - 15vh);
      position: relative;

      .record-cover {
        width: $width-cover;
        height: $width-cover;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
        width: 2.6rem;
        height: 4rem;
        text-align: center;
        line-height: 4rem;

        p {
          font-size: 0.7rem;
          opacity: 0.5;
        }
      }

      .progress-bar {
        flex: 1;
        height: 0.08rem;
        border-radius: 0.04rem;
        background-color: #fff;
        opacity: 0.5;

        &:active {
          height: 0.22rem;
          border-radius: 0.11rem;
        }
      }

      .little-dot {
        width: 0.6rem;
        height: 0.6rem;
        background-color: #fff;
        border-radius: 0.35rem;
        position: relative;
        top: -0.25rem;
        left: 2rem;

        &:active {
          width: 1rem;
          height: 1rem;
          border-radius: 0.5rem;
          position: relative;
          top: -0.4rem;
        }
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

  }
}
</style>