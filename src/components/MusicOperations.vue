<template>
  <div class="music-operations">
    <span class="item">
      <slot name="item1"></slot>
    </span>
    <span class="item">
      <slot name="item2"></slot>
    </span>
    <span class="item">
      <slot name="item3"></slot>
    </span>
    <span class="item">
      <slot name="item4"></slot>
    </span>
    <span class="item">
      <slot name="item5"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "MusicOperations"
}
</script>

<style lang="scss" scoped>
.music-operations {
  width: 100%;
  height: 100%;

  .item {
    display: inline-block;
    width: 20%;
    height: 100%;
    position: relative;

    i {
      position: absolute;
      font-size: 1.5rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.85;
    }
  }
}
</style>