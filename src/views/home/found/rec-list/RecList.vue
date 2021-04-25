<template>
  <div id="rec-list">
    <!-- 顶栏 -->
    <top-bar>
      <i class="iconfont icon-back" slot="left" @click="back"></i>
      <h1 slot="center">歌单</h1>
      <i class="iconfont icon-more" slot="right"></i>
    </top-bar>
    <!-- 主图 -->
    <div class="main-img" :style="{backgroundImage:`url(${mainImgUrl})`}">
      <div class="main-img-left">
        <img :src="mainImgUrl">
      </div>
      <div class="main-img-right">
        <h1>{{ titleName }}</h1>
        <div class="creator">
          <img :src="avatarUrl">
          <span>{{ nickname }}</span>
        </div>
        <p>{{ description }}</p>
        <i class="iconfont icon-xiala"></i>
      </div>
    </div>
    <!-- 播放全部 -->
    <div class="play-all">
      <i class="iconfont icon-play-all" slot="left"></i>
      <span class="play-text">播放全部</span>
      <p class="play-length">{{ '(' + this.recList.length + ')' }}</p>
    </div>
    <div class="rec-song-box">
      <scroll ref="scroll" :data="recList">
        <div>
          <div class="rec-song">
            <song v-for="(item, index) in this.recList" :key="index" @click.native="toPlayer(item, index)">
              <img :src="item.al.picUrl" slot="front-cover" @load="load">
              <h1 slot="song-name">{{ item.name }}</h1>
              <p slot="song-author">{{ item.ar.singers }} - {{ item.al.name }}</p>
              <i class="iconfont icon-more" slot="operate"></i>
            </song>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import TopBar from "components/TopBar";
import Song from "components/Song";
import Scroll from "components/scroll/Scroll";
import {mapActions} from 'vuex';

export default {
  name: "RecList",
  components: {
    TopBar,
    Song,
    Scroll,
  },
  data() {
    return {
      titleName: '', // 歌单名称
      description: '', // 歌单描述
      recList: [], // 歌单列表
      avatarUrl: '', // 歌单作者头像url
      nickname: '', // 歌单作者昵称
    }
  },
  computed: {
    mainImgUrl() {
      return this.$route.params.imgUrl;
    }
  },
  methods: {
    ...mapActions(['selectPlay']),
    // 返回主页
    back() {
      this.$router.go(-1);
    },
    // 推荐歌单获取
    recListGet() {
      let that = this;
      this.$api.found.recListQry({
        id: this.$route.params.id, // 歌单 id
      }).then(res => {
        this.titleName = res.data.playlist.name;
        this.description = res.data.playlist.description;
        this.avatarUrl = res.data.playlist.creator.avatarUrl;
        this.nickname = res.data.playlist.creator.nickname;
        let counter = 0;
        res.data.playlist.tracks.forEach(function (item1) {
          // 对歌手信息进行处理，有的歌曲可能不止一个歌手
          item1.ar.forEach(function (item2, index) {
            if (index == 0) {
              item1.ar.singers = item2.name;
            } else {
              item1.ar.singers = item1.ar.singers + '/' + item2.name;
            }
          });
          counter++;
          if (counter == res.data.playlist.tracks.length) {
            that.recList = res.data.playlist.tracks;
          }
        })
      })
    },
    load() {
      if (!this.checkloaded) {
        this.checkloaded = true
        // recommend-song 高度计算
        this.$nextTick(() => {
          let recSong = document.querySelector('.rec-song');
          let songHeight = document.querySelector('#song').scrollHeight;
          recSong.style.height = songHeight * this.recList.length + 'px';
          this.$refs.scroll.refresh();
        })
      }
    },
    // 去播放
    toPlayer(item, index) {
      this.selectPlay({
        list: this.recList,
        index: index
      });
    },
  },
  created() {
    this.recListGet();
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/mixin';

#rec-list {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background-color: #fff;

  .top-bar {
    box-shadow: none;
    color: #fff;
    background-color: transparent;
    position: relative;
    z-index: 81;

    .center {
      h1 {
        line-height: 54px;
      }
    }

    .icon-back {
      font-size: 1.1rem;
    }

    h1 {
      font-size: 1.1rem;
    }

    .icon-more {
      font-size: 1.5rem;
    }
  }

  .main-img {
    width: 100%;
    height: 28vh;
    margin-top: -54px;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    z-index: 80;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 5;
      backdrop-filter: blur(66px);
      -webkit-backdrop-filter: blur(8px);
    }

    .main-img-left {
      position: absolute;
      bottom: 4vh;
      left: 4vh;
      z-index: 10;
      width: 7.5rem;
      height: 7.5rem;
      border-radius: 0.8rem;
      // 让子元素呈现 3D 转换
      transform-style: preserve-3d;

      img {
        width: 100%;
        border-radius: 0.8rem;
      }

      &::before {
        content: '';
        display: inline-block;
        width: 6.5rem;
        height: 6.5rem;
        background-color: #f3f3f3;
        border-radius: 0.6rem;
        position: absolute;
        top: -0.3rem;
        left: 0.5rem;
        // 使用Z轴进行 3D 转换
        transform: translateZ(-1px);
        opacity: 0.1;
      }
    }

    .main-img-right {
      position: absolute;
      bottom: 4vh;
      right: 4vh;
      z-index: 10;
      width: 10rem;
      height: 7.5rem;

      h1 {
        line-height: 1.25rem;
      }

      .creator {
        margin-top: 1rem;
        width: 100%;
        height: 1.4rem;

        img {
          display: inline-block;
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 0.7rem;
          vertical-align: middle;
        }

        span {
          font-size: 13px;
          padding-left: 6px;
        }
      }

      p {
        position: absolute;
        left: 0;
        bottom: 0.25rem;
        @include single-line-ellipsis;
        display: inline-block;
        width: 100%;
        font-size: 0.8rem;
        opacity: 0.7;
      }

      .icon-xiala {
        position: absolute;
        bottom: 0.2rem;
        right: -0.4rem;
        font-size: 0.4rem;
        color: #fff;
        transform: rotate(-90deg);
        opacity: 0.7;
      }
    }
  }

  .play-all {
    width: 100%;
    height: 3.4rem;
    background-color: #fff;
    display: flex;
    position: relative;
    z-index: 80;

    .icon-play-all {
      height: 100%;
      padding: 0 0.3rem 0 0.7rem;
      color: #323537;
      font-size: 1.1rem;
      text-align: center;
      line-height: 3.4rem;
    }

    .play-text {
      height: 100%;
      padding: 0 0.1rem;
      color: #333334;
      font-size: 1.05rem;
      line-height: 3.4rem;
    }

    .play-length {
      width: 2rem;
      height: 100%;
      color: #999999;
      font-size: 0.8rem;
      padding: 1.5rem 0 0 0.2rem;
    }
  }

  .rec-song-box {
    width: 100%;
    height: calc(100vh - 28vh - 3.4rem);

    .rec-song {
      width: 100%;
      height: calc(100vh - 28vh - 3.4rem);
      background-color: #fff;
    }
  }
}
</style>