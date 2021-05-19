<template>
  <div id="music-application-item">
    <div class="icon-wrapper">
      <i class="iconfont" :class="icon"></i>
    </div>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: "MusicApplicationItem",
  props: ['item'],
  computed: {
    icon() {
      return this.item.icon;
    },
    title() {
      return this.item.title;
    },
  },
}
</script>

<style lang="scss" scoped>
#music-application-item {
  width: 25%;
  height: 5rem;
  color: #313537;

  .icon-wrapper {
    width: 100%;
    height: 50%;
    padding-top: 1rem;
    text-align: center;

    .iconfont {
      font-size: 1.7rem;
    }
  }

  h2 {
    font-size: 0.8rem;
    padding-top: 12px;
    text-align: center;
  }
}
</style>