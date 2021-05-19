<template>
  <div id="cloud-village">
    云村
  </div>
</template>

<script>
export default {
  name: "CloudVillage",
  data() {
    return {
      videoTag: [], // 视频标签
      videoList: [], // 视频列表
      recVideoList: [], // 推荐视频列表
    }
  },
  methods: {
    // 获取视频标签列表
    videoTagGet() {
      this.$api.cloudVillage.videoTagGet().then(res => {
        console.log(res)
      });
    },
    // 获取视频标签下的视频
    videoListGet() {
      this.$api.cloudVillage.videoListGet({
        // id: this.id;
      }).then(res => {
        console.log(res)
      });
    },
    // 获取推荐视频
    recVideoGet() {
      this.$api.cloudVillage.recVideoGet().then(res => {
        console.log(res)
      });
    },
  },
  mounted() {
    // this.videoTagGet();
    // this.videoListGet();
    // this.recVideoGet();
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#cloud-village {
  width: 100%;
  height: 100%;
  background-color: $color-bgc;
  color: #333334;
}
</style>