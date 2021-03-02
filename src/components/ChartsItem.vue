<template>
  <div class="charts-item">
    <div class="title">
      <slot name="title"></slot>
      <span class="icon-box">
        <van-icon name="arrow" class="icon"/>
      </span>
    </div>
    <slot name="top-three"></slot>
  </div>
</template>

<script>
export default {
  name: "ChartsItem"
}
</script>

<style lang="scss" scoped>
.charts-item {
  width: 23rem;
  height: 14rem;
  background-color: pink;
  padding: 1rem;

  .title {
    width: 100%;
    height: 2rem;
    background-color: skyblue;
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