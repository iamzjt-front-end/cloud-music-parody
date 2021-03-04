<template>
  <div class="recommend">
    <top-bar>
      <i class="iconfont icon-back" slot="left"></i>
      <h1 slot="center">每日推荐</h1>
      <i class="iconfont icon-more" slot="right"></i>
    </top-bar>
    <div class="main-img" :style="{backgroundImage:`url(${mainImgUrl})`}">
      <p class="calendar">
        <i class="day">{{day}}</i>
        <i class="month"> / {{month}}</i>
      </p>
      <p class="fortune">
        今日运势：吉
      </p>
    </div>
    <div class="play-all">
      <i class="iconfont icon-back" slot="left"></i>
      <span>播放全部</span>
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
      day: '',
      month: '',
    }
  },
  methods: {
    // 获取每日推荐歌单信息
    perDayRecGet() {
      let that = this;
      this.$api.found.perDayRecQry().then(res => {
        console.log('每日推荐：', res)
        that.perDayRecList = res.data.data.dailySongs;
        let index = Math.floor(33 * Math.random())
        that.mainImgUrl = res.data.data.dailySongs[index].al.picUrl;
      })
    },
    // 获取日和月
    dayMonthGet() {
      let dateObj = new Date();
      this.day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
      this.month = dateObj.getMonth() < 10 ? '0' + dateObj.getMonth() : dateObj.getMonth();
    },
  },
  mounted() {
    this.perDayRecGet();
    this.dayMonthGet();
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
    background-color: pink;
  }
}
</style>