<template>
  <div id="video-card">
    <div class="top-cover-img">
      <img :src="data.coverUrl">
    </div>
    <p class="description">{{ data.title }}</p>
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  props: ['data'],
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin";

#video-card {
  display: inline-block;
  width: 44vw;
  height: 67vw;
  border-radius: 10px;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.12);
  overflow: hidden;

  &:nth-child(2n - 1) {
    margin: 0 1.2vw 2.4vw 4.7vw;
  }

  &:nth-child(2n) {
    margin: 0 4.7vw 2.4vw 1.2vw;
  }

  .top-cover-img {
    width: 100%;
    height: calc(66vw - 2.7rem);

    img {
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .description {
    width: 100%;
    height: 2.7rem;
    line-height: 1.3rem;
    color: #2b2b2c;
    font-size: 0.8rem;
    padding: 3px 5px 0;
    @include multi-line-ellipsis(2);
  }
}
</style>