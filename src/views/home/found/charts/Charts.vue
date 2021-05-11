<template>
  <div id="charts">
    <!-- 顶栏 -->
    <top-bar>
      <i class="iconfont icon-back" slot="left" @click="back"></i>
      <h1 slot="center">排行榜</h1>
    </top-bar>
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

    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex';
import TopBar from "components/TopBar";
import SongListItem from "components/SongListItem";

export default {
  name: "Charts",
  components: {
    TopBar,
    SongListItem,
  },
  data() {
    return {
      topChartsList: [], // 榜单推荐 - 随机拿三个榜单
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
  }
}
</script>

<style lang="scss" scoped>
#charts {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;

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

  .topChartsRec {
    height: 11.2rem;
    background-color: #fff;
    margin: 1rem;
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
}
</style>