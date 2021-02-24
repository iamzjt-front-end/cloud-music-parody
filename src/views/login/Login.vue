<template>
  <div id="login">
    <div class="login-top">
      <div class="login-logo"></div>
    </div>
    <div class="login-down">
      <div class="to-login"></div>
      <div class="experience"></div>
      <div class="agreement"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";

#login {
  width: 200px;
  height: 200px;
  background-color: $color-theme-bgc-d;
}
</style>