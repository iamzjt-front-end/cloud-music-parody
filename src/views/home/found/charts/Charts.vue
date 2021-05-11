<template>
  <div id="charts">
    <!-- 顶栏 -->
    <top-bar>
      <i class="iconfont icon-back" slot="left" @click="back"></i>
      <h1 slot="center">排行榜</h1>
    </top-bar>
    <div class="content">
      <scroll :data="chartsList">
        <div>
          <!-- 榜单推荐 -->
          <div class="topChartsRec">
            <h1>榜单推荐</h1>
            <div class="topChartsRec-box">
              <song-list-item v-for="(item, index) in this.topChartsList" :key="index" @click.native="toRecList(item)">
                <img :src="item.coverImgUrl" slot="img">
                <p slot="description">{{ item.name }}</p>
              </song-list-item>
            </div>
          </div>
          <!-- 官方榜 -->
          <div class="official-charts">
            <div class="official-charts-title">
              <div class="icon-logo-box">
                <i class="iconfont icon-logo"></i>
              </div>
              <h1>官方榜</h1>
            </div>
            <div class="official-charts-box">
              <official-charts-item v-for="(item, index) in officialChartsList" :key="index" :item="item"/>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import TopBar from 'components/TopBar';
import SongListItem from 'components/SongListItem';
import OfficialChartsItem from 'components/OfficialChartsItem';
import Scroll from 'components/scroll/Scroll';

export default {
  name: "Charts",
  components: {
    TopBar,
    SongListItem,
    OfficialChartsItem,
    Scroll,
  },
  data() {
    return {
      topChartsList: [], // 榜单推荐 - 随机拿三个榜单
      officialChartsList: [], // 官方榜
      curWindList: [], // 曲风榜
      wholeWorldList: [], // 全球榜
    }
  },
  computed: {
    ...mapState(['chartsList'])
  },
  methods: {
    // 返回主页
    back() {
      this.$router.go(-1);
    },
    // 获取榜单推荐列表
    getTopChartsList() {
      let that = this;
      this.getRandomList().forEach(function (item) {
        that.topChartsList.push(that.chartsList[item]);
      })
    },
    // 生成三个不同的随机数
    getRandomList() {
      let randomList = [];
      for (let i = 0; i < 3; i++) { // 不断生成随机数
        let random = Math.floor((this.chartsList.length + 1) * Math.random());
        if (randomList.includes(random)) {
          i--;
        } else {
          randomList.push(random);
        }
      }
      return randomList;
    },
    // 榜单数据分类
    chartsDataProcess() {
      this.officialChartsList = this.chartsList.slice(0, 4); // 官方榜
      this.curWindList = this.chartsList.slice(4, 11); // 曲风榜
      this.wholeWorldList = this.chartsList.slice(11, 33); // 全球榜
    },
    // 跳转去歌单
    toRecList(val) {
      this.$router.push({
        name: 'rec-list',
        params: {
          id: val.id,
          imgUrl: val.coverImgUrl
        }
      });
    },
  },
  mounted() {
    this.getTopChartsList();
    this.chartsDataProcess();
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/variable";

#charts {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;

  .top-bar {
    box-shadow: none;
    color: #323233;
    background-color: #fff;
    position: relative;
    z-index: 81;

    h1 {
      line-height: 54px;
      font-size: 1.1rem;
    }

    .icon-back {
      font-size: 1.1rem;
    }
  }

  .content {
    width: 100%;
    height: calc(100vh - 54px);
    padding: 1rem 0;

    .topChartsRec {
      height: 11.2rem;
      background-color: #fff;
      margin: 0 1rem 1rem 1rem;
      border-radius: 0.7rem;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.06);
      padding: 1rem;

      h1 {
        color: #323233;
        font-size: 1.2rem;
        font-weight: bolder;
      }

      .topChartsRec-box {
        width: 100%;
        height: 9rem;

        .song-list-item {
          width: 30%;
          height: 8rem;
          margin-left: 0.3rem;
          margin-right: 0.3rem;

          p {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .official-charts {
      margin: 0 1rem;

      .official-charts-title {
        width: 100%;

        .icon-logo-box {
          display: inline-block;
          width: 1.6rem;
          height: 1.6rem;
          padding: 0.3rem;
          background-color: $color-theme-bgc-d;
          border-radius: 0.8rem;

          .icon-logo {
            font-size: 1rem;
          }
        }

        h1 {
          display: inline-block;
          height: 1.6rem;
          line-height: 1.6rem;
          color: #323233;
          font-size: 1.2rem;
          font-weight: bolder;
          margin-left: 0.5rem;
        }
      }
    }
  }
}
</style>