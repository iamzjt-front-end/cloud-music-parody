<template>
  <div class="day-recommend">
    <!-- 顶栏 -->
    <top-bar @leftClick="back">
      <i class="iconfont icon-back" slot="left"></i>
      <h1 slot="center">每日推荐</h1>
      <i class="iconfont icon-more" slot="right"></i>
    </top-bar>
    <!-- 主图 -->
    <div class="main-img" :style="{backgroundImage:`url(${mainImgUrl})`}">
      <p class="calendar">
        <i class="day">{{ day }}</i>
        <i class="month"> / {{ month }}</i>
      </p>
      <p class="fortune">
        今日运势：吉
      </p>
    </div>
    <!-- 播放全部 -->
    <div class="play-all">
      <i class="iconfont icon-play-all" slot="left"></i>
      <span class="play-text">播放全部</span>
      <p class="play-length">{{ '(' + perDayRecList.length + ')' }}</p>
    </div>
    <div class="recommend-song-box" ref="recommendSongBox" v-show="perDayRecList.length">
      <scroll ref="scroll" :data="{perDayRec: perDayRecList}">
        <div>
          <!-- 推荐歌曲曲目 -->
          <div class="recommend-song">
            <song v-for="(item, index) in perDayRecList" :key="index" @click.native="toPlayer(item, index)">
              <img :src="item.al.picUrl" slot="front-cover" @load="load">
              <h1 slot="song-name">{{ item.name }}</h1>
              <p slot="song-author">{{ item.ar.singers }} - {{ item.al.name }}</p>
              <i class="iconfont icon-more" slot="operate"></i>
            </song>
          </div>
        </div>
      </scroll>
    </div>
    <div class="loading" v-show="!perDayRecList.length">
      <van-loading size="24px" color="#323233" text-color="#323233">加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import Song from "@/components/Song";
import {mapActions, mapState} from 'vuex';
import Scroll from "@/components/scroll/Scroll";

export default {
  name: "DayRecommend",
  components: {
    TopBar,
    Song,
    Scroll
  },
  data() {
    return {
      perDayRecList: [],
      mainImgUrl: '',
      day: '',
      month: '',
      indexList: [],
    }
  },
  computed: {
    ...mapState(['fullScreen'])
  },
  methods: {
    ...mapActions(['selectPlay']),
    // 每日推荐获取
    perDayRecGet() {
      let that = this;
      this.$api.found.perDayRecQry().then(res => {
        // console.log('每日推荐：', res)
        let counter = 0;
        res.data.data.dailySongs.forEach(function (item1) {
          // 对歌手信息进行处理，有的歌曲可能不止一个歌手
          item1.ar.forEach(function (item2, index) {
            if (index == 0) {
              item1.ar.singers = item2.name;
            } else {
              item1.ar.singers = item1.ar.singers + '/' + item2.name;
            }
          });
          counter++;
          if (counter == res.data.data.dailySongs.length) {
            // 等遍历完再进行这里面的操作
            that.perDayRecList = res.data.data.dailySongs;
            // 设置随机封面图
            let index = Math.floor(that.perDayRecList.length * Math.random());
            that.mainImgUrl = res.data.data.dailySongs[index].al.picUrl;
          }
        })
      })
    },
    load() {
      if (!this.checkloaded) {
        this.checkloaded = true
        // recommend-song 高度计算
        this.$nextTick(() => {
          let recommendSong = document.querySelector('.recommend-song');
          let songHeight = document.querySelector('#song').scrollHeight;
          recommendSong.style.height = songHeight * this.perDayRecList.length + 'px';
          this.$refs.scroll.refresh();
        })
      }
    },
    // 获取日和月
    dayMonthGet() {
      let dateObj = new Date();
      let day = dateObj.getDate();
      this.day = day < 10 ? '0' + day : day;
      let month = dateObj.getMonth() + 1;
      this.month = month < 10 ? '0' + month : month;
    },
    // 返回主页
    back() {
      this.$router.go(-1);
    },
    // 去播放
    toPlayer(item, index) {
      this.selectPlay({
        list: this.perDayRecList,
        index: index
      });
    },
    // 歌单内容区域高度更新
    songListHupt() {
      // 分两种情况
      // 第一种: 从 normal-player 最小化成 mini-player(刚生成) 时, 需要通过 player 的 playList(控制player的显示隐藏) 和 fullScreen 来动态设置歌单列表内容高度;
      // 第二种: 已经有 mini-player, 并从其他页面进入歌单列表时, 需要在 mounted 时再调用一次函数;
      let player = document.querySelector('#player');
      if (player.style.display != 'none' && !this.fullScreen) {
        this.$nextTick(() => {
          this.$refs.recommendSongBox.style.height = 'calc(100vh - 14.2rem - 3.4rem - 2.8rem)';
          this.$bus.$emit('BScrollRefresh');
        })
      }
    }
  },
  created() {
    this.perDayRecGet();
    this.dayMonthGet();
  },
  mounted() {
    this.songListHupt();
  },
  watch: {
    fullScreen(newVal, oldVal) {
      if (newVal != oldVal && newVal == false) {
        // 更新歌单内容区域高度
        this.songListHupt();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.day-recommend {
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
    color: #fff;
    background-color: transparent !important;
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
    height: 14.2rem;
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
      //backdrop-filter: blur(18px);
      //-webkit-backdrop-filter: blur(18px);
      background-color: rgba(0, 0, 0, .32);
    }

    .calendar {
      position: absolute;
      bottom: 2.2rem;
      left: 1.4rem;

      .day {
        font-family: huangyou;
        font-size: 3rem;
      }
    }

    .fortune {
      position: absolute;
      bottom: 1rem;
      left: 1.5rem;
      font-size: 0.85rem;
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

  .recommend-song-box {
    width: 100%;
    height: calc(100vh - 14.2rem - 3.4rem);
    overflow: hidden;

    .recommend-song {
      width: 100%;
      height: calc(100vh - 14.2rem - 3.4rem);
      background-color: #fff;
    }
  }

  .loading {
    padding-top: 1rem;
    text-align: center;
  }
}
</style>