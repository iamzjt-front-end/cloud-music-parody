<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" @change="onChange" route>
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
  methods: {
    onChange(index) {
      console.log(index);
      this.$nextTick(() => {
        this.$bus.$emit('BScrollRefresh');
        // 偶尔切换tab栏的时候, 会出现better-scroll可滚动高度计算不正确的情况
        // 那么, 每次切换tab栏的时候, 发射一个 BScrollRefresh 事件, 重新加载better-scroll
      })
    },
  },
  mounted() {
    if (this.$route.path != '/found') {
      this.$router.replace({
        path: '/found'
      })
    }
  }
}
</script>

<style scoped>
.tab-bar {
  width: 100vw;
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 80;
}
</style>