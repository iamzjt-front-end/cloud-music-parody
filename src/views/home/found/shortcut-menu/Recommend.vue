<template>
  <div class="recommend">
    <top-bar>
      <i class="iconfont icon-back" slot="left"></i>
      <h1 slot="center">每日推荐</h1>
      <i class="iconfont icon-more" slot="right"></i>
    </top-bar>
    <div class="main-img" :style="{backgroundImage:`url(${mainImgUrl})`}">
      <p class="calendar">
        <i class="day">04</i>
        <i class="month"> / 03</i>
      </p>
      <p class="fortune">
        今日运势：吉
      </p>
    </div>
    <div class="play-all">
      <i class="iconfont icon-play-all" slot="left"></i>
      <span class="play-text">播放全部</span>
      <p class="play-length">{{ '(' + perDayRecList.length + ')' }}</p>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";

export default {
  name: "recommend",
  components: {
    TopBar
  },
  data() {
    return {
      perDayRecList: [],
      mainImgUrl: '',
    }
  },
  methods: {
    perDayRecGet() {
      let that = this;
      this.$api.found.perDayRecQry().then(res => {
        console.log('每日推荐：', res)
        that.perDayRecList = res.data.data.dailySongs;
        let index = Math.floor(33 * Math.random());
        that.mainImgUrl = res.data.data.dailySongs[index].al.picUrl;
      })
    }
  },
  mounted() {
    this.perDayRecGet();
  }
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
      font-size: 1.3rem;
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
      padding: 1.35rem 0 0 0.2rem;
    }
  }
}
</style>