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
      for (let i = 0; i < 10; i++) { // 不断生成随机数
        // todo 不是很完美, 因为存在 10 次中随机数重复9次的可能, 即不能生成3次不同的随机数 (只不过可能性实在是不大, 暂时先不优化了)
        let random = Math.floor(this.chartsList.length * Math.random());
        if (randomList.length == 0) { // 一开始没数据, 添加第一项随机数进去
          randomList.push(random);
        } else {
          for (let j = 0; j < randomList.length; j++) {
            if (randomList[j] == random) { // 只要有一项相同, 直接跳出当前循环
              break;
            } else {
              if (j == randomList.length - 1 && randomList.length < 3) {
                // 只有新生成的随机数与原随机数数组中的每一项都不相同 且 随机数数组的长度不大于3, 才能push进去
                randomList.push(random);
              }
            }
          }
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