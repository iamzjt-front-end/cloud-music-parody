<template>
  <div class="song-list-item">
    <div class="img"></div>
    <p></p>
  </div>
</template>

<script>
export default {
  name: "SongListItem",
  created() {
    this.songListImgQry();
  },
  methods: {
    songListImgQry() {
      this.$api.found.songListImg({
        uid: ''
      }).then(res => {
        if (res) {
          //
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.song-list-item {
  width: 6rem;
  height: 8rem;
  background-color: pink;
}
</style>