<template>
  <div id="app">
    <p>
      Hello World!
    </p>
    <i class="iconfont icon-settings"></i>
    <i class="iconfont icon-logo"></i>
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/css/variable.scss";

#app {
  p {
    color: $color-theme-bgc-d;
  }

  .icon-settings {
    color: $color-theme;
  }

  .icon-logo {
    color: $color-theme-bgc-d;
    font-size: 60px;
  }
}
</style>