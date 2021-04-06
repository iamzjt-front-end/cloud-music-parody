<template>
  <div id="home">
    <!-- 内容区 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 80;
}
</style>