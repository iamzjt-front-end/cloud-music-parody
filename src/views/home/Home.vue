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

}
</style>