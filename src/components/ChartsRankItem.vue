<template>
  <div class="charts-rank-item">
    <span class="img">
      <slot name="img"></slot>
    </span>
    <span class="songIndex">
      <slot name="songIndex"></slot>
    </span>
    <span class="songName">
      <slot name="songName"></slot>
    </span>
    <span class="songAuthor">
      <slot name="songAuthor"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "ChartsRankItem"
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin";

.charts-rank-item {
  width: 100%;
  height: 3rem;
  background-color: orange;
  margin-top: 0.4rem;

  span {
    display: inline-block;
  }

  .img {
    width: 3rem;
    height: 3rem;
    background-color: #fff;
    border-radius: 0.4rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .songIndex, .songName, .songAuthor {
    height: 3rem;
    line-height: 3rem;

    p {
      @include single-line-ellipsis;
    }
  }

  .songIndex {
    width: 1.8rem;
    text-align: center;
    background-color: greenyellow;
  }

  .songName {
    color: #333334;
    max-width: 7rem;
    padding: 0 0.1rem;
    background-color: blueviolet;
  }

  .songAuthor {
    color: #9a9a9a;
    max-width: 7rem;
    padding: 0 0.1rem;
    background-color: rosybrown;
  }
}
</style>