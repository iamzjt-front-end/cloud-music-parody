<template>
  <div id="home">
    <keep-alive>
      <router-view/>
    </keep-alive>
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

<style scoped>

</style>