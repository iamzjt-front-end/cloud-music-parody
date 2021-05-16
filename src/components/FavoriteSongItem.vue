<template>
  <div id="favorite-song-item">
    <img :src="imgUrl">
    <div class="info-box">
      <h1>{{ songListName }}</h1>
      <p>{{ `${trackCount}首，by ${creatorNickname}` }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoriteSongItem",
  props: ['item'],
  computed: {
    imgUrl() { // 主图 url
      return this.item.coverImgUrl;
    },
    trackCount() { // 歌单歌曲数量
      return this.item.trackCount;
    },
    songListName() { // 歌单名字
      return this.item.name;
    },
    creatorNickname() { // 歌单作者
      return this.item.creator.nickname;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin";

#favorite-song-item {
  width: 100%;
  height: 4rem;
  padding: 0.5rem 0.5rem 0;

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 8px;
    vertical-align: middle;
  }

  .info-box {
    display: inline-block;
    width: calc(100% - 3.5rem);
    height: 3.2rem;
    padding-left: 10px;
    padding-right: 5px;
    vertical-align: middle;

    h1 {
      width: 100%;
      height: 1.8rem;
      line-height: 1.8rem;
      color: #333334;
      font-size: 0.9rem;
      @include single-line-ellipsis;
    }

    p {
      width: 100%;
      height: 1.4rem;
      line-height: 1.4rem;
      color: #9c9c9c;
      font-size: 0.7rem;
    }
  }
}
</style>