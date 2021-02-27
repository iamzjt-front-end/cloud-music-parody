<template>
  <div id="found">
    <van-nav-bar>
      <template #left>
        <i class="iconfont icon-settings"></i>
      </template>
      <template #title>
        <van-icon name="search" size="18"/>
      </template>
      <template #right>
        <i class="iconfont icon-distinguish"></i>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "found"
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#found {
  width: 100%;
  height: 100vh;
  background-color: $color-bgc;
  color: #333334;
}
</style>