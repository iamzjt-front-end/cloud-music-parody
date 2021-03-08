<template>
  <div class="recommend">
    <van-index-bar :index-list="indexList">
      <!-- 顶栏 -->
      <top-bar>
        <i class="iconfont icon-back" slot="left" @click="backToHome"></i>
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
      <van-index-anchor index="1">
        <!-- 播放全部 -->
        <div class="play-all">
          <i class="iconfont icon-play-all" slot="left"></i>
          <span class="play-text">播放全部</span>
          <p class="play-length">{{ '(' + perDayRecList.length + ')' }}</p>
        </div>
      </van-index-anchor>
      <!-- 推荐歌曲曲目 -->
      <div class="recommend-song">
        <song v-for="(item, index) in this.perDayRecList" :key="index" @click.native="toPlayer(item)">
          <img :src="item.al.picUrl" slot="front-cover">
          <h1 slot="song-name">{{ item.name }}</h1>
          <p slot="song-author">{{ item.ar.singers }} - {{ item.al.name }}</p>
          <i class="iconfont icon-more" slot="operate"></i>
        </song>
        <div style="width: 100%; height: 1px"></div>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import Song from "@/components/Song";

export default {
  name: "Recommend",
  components: {
    TopBar,
    Song,
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
  methods: {
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
            let index = Math.floor(32 * Math.random());
            that.mainImgUrl = res.data.data.dailySongs[index].al.picUrl;
          }
        })
      })
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
    backToHome() {
      this.$router.push({path: '/found'});
    },
    // 跳转去播放
    // path传参用query，会附带在url地址上
    // name传参用params，不会附带在url地址上
    toPlayer(item) {
      this.$router.push({
        name: 'player',
        params: {
          songId: item.id,
          originalPath: '/recommend',
        },
      });
    },
  },
  created() {
    this.perDayRecGet();
    this.dayMonthGet();
  },
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  height: 100%;

  .top-bar {
    box-shadow: none;
    color: #fff;
    background-color: transparent;
    position: relative;
    z-index: 2;

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

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
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
      padding: 0.8rem 0 0 0.2rem;
    }
  }

  .recommend-song {
    width: 100%;
    height: calc(100vh - 28vh - 3.4rem);
    background-color: #fff;
  }
}
</style>