<template>
  <div id="home">
    <!-- 内容区 -->
    <div class="content">
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

1

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
  .router-view {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
}
</style>