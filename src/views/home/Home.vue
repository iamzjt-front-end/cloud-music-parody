<template>
  <div class="home">
    <router-view/>
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