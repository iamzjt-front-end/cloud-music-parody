<template>
  <div id="home">
    <!-- 内容区 -->
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <!-- 播放器 -->
    <player></player>
    <!-- tab栏 -->
    <tab-bar/>
  </div>
</template>

<script>
import Player from "@/components/Player";
import TabBar from "@/components/TabBar";

export default {
  name: "Home",
  components: {
    TabBar,
    Player
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variable';

.content {
  width: 100%;
  height: 100%;
}
</style>