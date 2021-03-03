<template>
  <div class="charts-item">
    <div class="title">
      <slot name="title"></slot>
      <span class="icon-box">
        <van-icon name="arrow" class="icon"/>
      </span>
    </div>
    <div class="charts-rank">
      <charts-rank-item v-for="(rankItem, index) in this.topThreeList" :key="index">
        <img :src="rankItem.al.picUrl" slot="img">
        <p slot="songIndex">{{ index + 1 }}</p>
        <p slot="songName">{{ rankItem.name }}</p>
        <p slot="songAuthor">- {{ rankItem.ar[0].name }}</p>
      </charts-rank-item>
    </div>
  </div>
</template>

<script>
import ChartsRankItem from "@/components/ChartsRankItem";

export default {
  name: "ChartsItem",
  data() {
    return {
      topThreeList: [],
    }
  },
  components: {
    ChartsRankItem
  },
  props: {
    chartsList: Array,
    index: Number
  },
  mounted() {
    console.log('子组件拿到的：', this.index, this.chartsList[this.index]);
    this.chartsDetGet();
    console.log('topThreeList:', this.topThreeList);
  },
  methods: {
    // 获取榜单详情
    chartsDetGet() {
      // 将父组件的榜单列表和组件的index都传过来，然后每个子组件单独获取自己的榜单详情就可以了
      let that = this;
      this.$api.found.chartsDetQry({
        id: this.chartsList[this.index].id
      }).then(res => {
        if (res) {
          console.log('排行榜详情：', res.data.playlist.tracks.slice(0, 3))
          that.topThreeList = res.data.playlist.tracks.slice(0, 3);
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.charts-item {
  width: 23rem;
  height: 14rem;
  background-color: #fff;
  margin: 0.5rem 0.7rem 0 0;
  padding: 1rem;
  border-radius: 0.6rem;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.03);
  display: inline-block;

  .title {
    width: 100%;
    height: 2rem;
    font-size: 1.1rem;
    color: #333334;
    text-align: center;
    line-height: 2rem;

    h1 {
      display: inline-block;
    }

    .icon-box {
      display: inline-block;
      width: 1.5rem;
      height: 1.4rem;
      overflow: hidden;
      padding-top: 0.15rem;
    }
  }
}
</style>