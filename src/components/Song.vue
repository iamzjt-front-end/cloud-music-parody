<template>
  <div id="song">
    <!-- 封面 -->
    <div class="front-cover">
      <slot name="front-cover"></slot>
    </div>
    <!-- 歌曲信息 -->
    <div class="song-info">
      <div class="song-name">
        <slot name="song-name"></slot>
      </div>
      <div class="song-author">
        <slot name="song-author"></slot>
      </div>
    </div>
    <!-- 操作 -->
    <div class="operate">
      <slot name="operate"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Song"
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/mixin";

#song {
  width: 100%;
  height: 3.5rem;
  background-color: #fff;
  margin: 0.5rem 0 1rem 0;
  padding: 0 1.05rem;
  display: flex;

  .front-cover {
    width: 3.5rem;
    height: 3.5rem;
    background-color: rosybrown;
    border-radius: 0.5rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .song-info {
    width: calc(100% - 3.5rem - 5rem);
    height: 100%;

    .song-name, .song-author {
      width: 100%;
      padding: 0 0.5rem;
      @include single-line-ellipsis;
    }

    .song-name {
      color: #333334;
      height: 2rem;
      line-height: 2rem;
      font-size: 1.05rem;
    }

    .song-author {
      color: #808080;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.6rem;
    }
  }

  .operate {
    width: 5rem;
    height: 3.5rem;
    color: #b3b3b3;
    line-height: 3.5rem;
    text-align: right;

    i {
      font-size: 1.3rem;
    }
  }
}
</style>