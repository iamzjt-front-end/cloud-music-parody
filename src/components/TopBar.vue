<template>
  <div class="top-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  height: 54px;
  line-height: 54px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
}

.left, .right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>