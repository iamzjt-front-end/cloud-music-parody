<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item name="found" to="/found">
        <span>发现</span>
        <template #icon>
          <i class="iconfont icon-found"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="mine" to="/mine">
        <span>我的</span>
        <template #icon>
          <i class="iconfont icon-mine"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="cloud-village" to="/cloud-village">
        <span>云村</span>
        <template #icon>
          <i class="iconfont icon-cloud-village"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      active: 'found',
    };
  },
}
</script>

<style scoped>
</style>