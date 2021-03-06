<template>
  <div id="player" ref="player">
    <div class="obscured-glass">
      <top-bar>
        <i class="iconfont icon-xiala" slot="left"></i>
        <div class="singNmAndSinger" slot="center">
          <h1>{{ songNm }}</h1>
          <p>{{ singers }} - {{ albumNm }}</p>
        </div>
        <i class="iconfont icon-fenxiang" slot="right"></i>
      </top-bar>
      <!-- 唱片封面 -->
      <div class="record-cover-box">
        <div class="record-cover">
          <img :src="albumPicUrl">
        </div>
      </div>
      <!-- 其他选项 -->
      <div class="other-options">
        <music-operations>
          <i class="iconfont icon-aixin" slot="item1"></i>
          <i class="iconfont icon-xiazai" slot="item2"></i>
          <i class="iconfont icon-texiao" slot="item3"></i>
          <i class="iconfont icon-pinglun" slot="item4"></i>
          <i class="iconfont icon-more" slot="item5"></i>
        </music-operations>
      </div>
      <!-- 进度条 -->
      <div class="progress-bar-box">
        <div class="start-time">
          <p>00:00</p>
        </div>
        <div class="progress-bar">
          <div class="little-dot"></div>
        </div>
        <div class="end-time">
          <p>04:22</p>
        </div>
      </div>
      <!-- 播放控制 -->
      <div class="play-control">
        <music-operations>
          <i class="iconfont icon-shunxu" slot="item1"></i>
          <i class="iconfont icon-shangyiqu" slot="item2"></i>
          <i class="iconfont icon-bofang" slot="item3" @click="this.play"></i>
          <i class="iconfont icon-xiayiqu" slot="item4"></i>
          <i class="iconfont icon-bofangliebiao" slot="item5"></i>
        </music-operations>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import MusicOperations from "@/components/MusicOperations";

export default {
  name: "Player",
  components: {
    TopBar,
    MusicOperations,
  },
  data() {
    return {
      songId: '', // 歌曲Id
      songDet: null, // 歌曲详情
      songNm: '', // 歌名
      singers: '', // 歌手
      albumNm: '', // 专辑名称
      albumPicUrl: '', // 专辑封面
    }
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
          if (index == 0) {
            songData.ar.singers = item.name;
          } else {
            songData.ar.singers = songData.ar.singers + '/' + item.name;
          }
          counter++;
          if (counter == songData.ar.length) {
            // 等遍历完再进行这里面的操作
            that.songDet = songData;
            that.songNm = songData.name;
            that.singers = songData.ar.singers;
            that.albumNm = songData.al.name;
            that.albumPicUrl = songData.al.picUrl;
            that.$nextTick(() => {
              that.$refs.player.style = `background-image: url("${that.albumPicUrl}")`;
            })
          }
        });
      })
    },
    // 播放
    play() {
      console.log()
    }
  },
  created() {
    if (this.$route.params.songId) {
      sessionStorage.setItem('songId', JSON.stringify(this.$route.params.songId));
      // console.log('params', this.$route.params.songId)
    }
    this.songId = JSON.parse(sessionStorage.getItem('songId'));
    // console.log('songId:', this.songId)
    this.SongDetGet(this.songId);
  },
}
</script>

<style lang="scss" scoped>
$width-cover: 30vh;

#player {
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

    .icon-bofang {
      font-size: 3.2rem;
    }

    i {
      top: 35%;
    }
  }
}
</style>