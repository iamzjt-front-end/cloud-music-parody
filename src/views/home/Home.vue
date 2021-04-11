<template>
  <div id="home">
    <div class="content">
      <!-- 内容区 -->
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <!-- tab栏 -->
    <tab-bar/>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";

export default {
  name: "Home",
  components: {
    TabBar,
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variable';

#home {
  width: 100vw;
  height: 100vh;

  .content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 50px;
    right: 0;
    z-index: 80;
  }
}
</style>