<template>
  <div class="song-list-item">
    <div class="img" ref="imgBox">
      <slot name="img"></slot>
    </div>
    <slot name="description"></slot>
    <slot name="bubble"></slot>
  </div>
</template>

<script>
export default {
  name: "SongListItem",
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
  },
  created() {
    // this.songListImgQry();
  },
  mounted() {
    this.$refs.imgBox.style.height = this.$refs.imgBox.clientWidth + 'px';
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin";

.song-list-item {
  width: 7rem;
  height: 10rem;
  background-color: #fff;
  margin: 0.75rem 0.2rem 0.5rem 0.2rem;
  display: inline-block;
  position: relative;

  .img {
    width: 100%;
    //height: 7rem;
    background-color: #fff;
    border-radius: 0.8rem;
    position: relative;
    // 让子元素呈现 3D 转换
    transform-style: preserve-3d;

    img {
      width: 100%;
      border-radius: 0.8rem;
    }

    &::before {
      content: '';
      display: inline-block;
      width: 85%;
      height: 85%;
      background-color: #ededed;
      border-radius: 0.6rem;
      position: absolute;
      top: -0.3rem;
      left: 0.5rem;
      // 使用Z轴进行 3D 转换
      transform: translateZ(-1px);
    }
  }

  p {
    display: inline-block;
    width: 100%;
    height: 3rem;
    color: #333334;
    font-size: 0.8rem;
    line-height: 1.3rem;
    padding-top: 0.3rem;
    @include multi-line-ellipsis(2);
  }

  span {
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
</style>