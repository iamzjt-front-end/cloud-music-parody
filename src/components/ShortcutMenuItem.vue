<template>
  <div class="shortcut-menu-item">
    <div class="circle">
      <slot name="icon"></slot>
    </div>
    <slot name="title"></slot>
  </div>
</template>

<script>
export default {
  name: "ShortcutMenuItem"
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variable";

.shortcut-menu-item {
  display: inline-block;
  width: 5.5rem;
  height: 5rem;
  background-color: $color-bgc;
  overflow: hidden;

  .circle {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    background-color: $color-bgc-1;
    border-radius: 2rem;
    margin: 0.5rem auto;
    text-align: center;
    line-height: 3rem;

    i {
      color: #323537;
      font-size: 28px;
    }
  }

  p {
    color: #757575;
    font-size: $font-size-m;
    text-align: center;
  }
}
</style>