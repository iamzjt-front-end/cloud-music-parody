<template>
  <div class="song-list-square">
    歌单广场
  </div>
</template>

<script>
export default {
  name: "SongListSquare",
  methods: {
    playListTagsGet() {
      this.$api.found.playListTagsQry().then(res => {
        console.log(res)
      })
    },
    highqualityListGet() {
      // cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
      // limit: 取出歌单数量 , 默认为 20
      // before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
    }
  },
  created() {
    this.playListTagsGet();
  }
}
</script>

<style lang="scss" scoped>

</style>