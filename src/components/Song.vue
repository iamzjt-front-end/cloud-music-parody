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
  height: 4.5rem;
  background-color: #fff;
  padding: 0.5rem 1.05rem 1.2rem;
  display: flex;
  align-items: center;

  .front-cover {
    width: 3.5rem;
    height: 3.5rem;
    background-color: #f5f5f5;
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
      padding: 0 0.8rem;

      h1, p {
        @include single-line-ellipsis;
      }
    }

    .song-name {
      color: #333334;
      height: 2rem;
      line-height: 1.5rem;
      font-size: 1.2rem;
    }

    .song-author {
      color: #808080;
      height: 1.5rem;
      line-height: 1rem;
      font-size: 0.85rem;
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