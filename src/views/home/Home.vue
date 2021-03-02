<template>
  <div id="home">
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <tab-bar/>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";

export default {
  name: "Home",
  components: {
    TabBar
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
}
</style>