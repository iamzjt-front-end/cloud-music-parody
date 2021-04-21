<template>
  <div class="column">
    <div class="top">
      <slot name="title"></slot>
      <span class="more" @click="toMore">更多<span class="iconBox">
          <van-icon name="arrow" class="icon"/>
        </span>
      </span>
    </div>
    <div class="down">
      <slot name="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Column",
  props: ['more'],
  methods: {
    toMore() {
      if (this.more == 'rec') {
        // 跳转去歌单广场
        this.$router.push({path: '/song-list-square'});
      } else if (this.more == 'char') {
        // 跳转去排行榜
        this.$router.push({path: '/charts'});
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.column {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  background-color: #fff;
  overflow: hidden;

  .top {
    height: 2rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #2b2b2c;
      font-size: 1.1rem;
      font-weight: bold;
      display: inline-block;
    }

    .more {
      height: 1.6rem;
      border-radius: 0.8rem;
      border: 1px solid #e6e6e6;
      padding: 0.07rem 0.65rem 0.05rem 1rem;
      background-color: #fff;
      text-align: center;
      line-height: 1.4rem;
      color: #333334;
      font-size: 0.9rem;

      .iconBox {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        overflow: hidden;
        padding-top: 0.1rem;
      }
    }
  }

  .down {
    width: 100%;
    height: calc(100% - 2rem);
  }
}
</style>