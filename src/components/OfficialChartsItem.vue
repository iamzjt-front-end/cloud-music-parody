<template>
  <div id="official-charts-item" ref="officialChartsItem" @click="toRecList(item)">
    <div class="left">
      <img :src="item.coverImgUrl">
      <span class="bubble">{{ item.updateFrequency }}</span>
    </div>
    <div class="right">
      <div class="rightItem" v-for="(item, index) in topThreeList" :key="index">
        <span class="songIndex">{{ index + 1 + '.' }}</span>
        <span class="songName">{{ item.name }}</span>
        <span class="linker">-</span>
        <span class="songAuthor">{{ item.ar[0].name }}{{ item.ar[1] ? '/' + item.ar[1].name : '' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OfficialChartsItem",
  props: ['item', 'index'],
  data() {
    return {
      bgcList: ['#f6eaef', '#ebf2f1', '#ebeff5', '#f5e9e9'],
      topThreeList: [], // 前三歌曲列表
    }
  },
  methods: {
    // 榜單背景色
    updateBgc() {
      this.$refs.officialChartsItem.style.backgroundColor = this.bgcList[this.index];
    },
    // 榜單詳情更新
    chartsDetGet() {
      // 将父组件的榜单列表和组件的index都传过来，然后每个子组件单独获取自己的榜单详情就可以了
      let that = this;
      this.$api.found.chartsDetQry({
        id: this.item.id
      }).then(res => {
        if (res) {
          that.topThreeList = res.data.playlist.tracks.slice(0, 3);
        }
      })
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
    this.updateBgc();
    this.chartsDetGet();
  }
}
</script>

<style lang="scss" scoped>
#official-charts-item {
  width: 100%;
  height: 8rem;
  margin-top: 0.8rem;
  border-radius: 0.6rem;
  display: flex;

  .left {
    width: 6rem;
    height: 6rem;
    margin: 1rem 0 0 1rem;
    border-radius: 0.6rem;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .bubble {
      position: absolute;
      top: 3px;
      right: -2px;
      display: block;
      line-height: 14px;
      padding: 2px 6px;
      background-color: rgba(0, 0, 0, .1);
      border-radius: 8px;
      font-size: 12px;
      color: #fff;
      transform: scale(0.8);
    }
  }

  .right {
    width: calc(100% - 8rem);
    height: calc(100% - 2rem);
    margin: 1rem;

    .rightItem {
      width: 100%;
      height: 2rem;
      color: #323233;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .songIndex,
      .songName,
      .linker,
      .songAuthor {
        display: inline-block;
        font-size: 0.95rem;
        line-height: 2rem;
      }

      .songIndex {
        margin-right: 6px;
      }

      .linker {
        margin: 0 5px;
      }

      .songAuthor {
        color: #8f8f8f;
      }
    }
  }
}
</style>