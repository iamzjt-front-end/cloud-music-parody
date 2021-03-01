<template>
  <div class="song-list-item">
    <div class="img">
      <img src="" alt="">
    </div>
    <p>十秒沦陷手册 揽下全天的单曲循环</p>
  </div>
</template>

<script>
export default {
  name: "SongListItem",
  created() {
    // this.songListImgQry();
  },
  methods: {
    // songListImgQry() {
    //   this.$api.found.songListImg({
    //     uid: ''
    //   }).then(res => {
    //     if (res) {
    //       //
    //     }
    //   })
    // },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin";

.song-list-item {
  width: 8rem;
  height: 11rem;
  background-color: pink;
  margin-top: 0.5rem;

  .img {
    width: 8rem;
    height: 8rem;
    background-color: skyblue;
    border-radius: 0.8rem;
    border: 0.05rem solid #e3e5e5;
    position: relative;
    // 让子元素呈现 3D 转换
    transform-style: preserve-3d;

    &::before {
      content: '';
      display: inline-block;
      width: 7rem;
      height: 7rem;
      background-color: #f3f3f3;
      border-radius: 0.6rem;
      position: absolute;
      top: -0.3rem;
      left: 0.5rem;
      // 使用Z轴进行 3D 转换
      transform: translateZ(-1px);
    }
  }

  p {
    color: #333334;
    font-size: 0.8rem;
    line-height: 1.3rem;
    padding-top: 0.3rem;
    @include multi-line-ellipsis(2);
  }
}
</style>