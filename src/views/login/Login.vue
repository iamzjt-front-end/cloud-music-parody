<template>
  <div id="login">
      <div class="login-logo">
        <i class="iconfont icon-logo"></i>
      </div>
    <div class="to-login">一键登录</div>
    <div class="experience">立即体验</div>
    <div class="agreement">
      <van-checkbox v-model="checked" checked-color="#d7766b" icon-size="12px">
        <i class="agree">同意</i>
        <i class="agree-content">
          《服务条款》《隐私条款》《儿童隐私政策》
        </i>
      </van-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      checked: true,
    };
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";

#login {
  width: 100%;
  height: 100vh;
  background-color: $color-theme-bgc-d;
  position: relative;
  overflow: hidden; // 触发BFC，解决外边距塌陷

  .login-logo {
    $logo-width: 4rem;
    width: $logo-width;
    height: $logo-width;
    background-color: $color-theme-bgc;
    border-radius: $logo-width * 0.5;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translateX(-50%);

    .icon-logo {
      display: inline-block;
      font-size: $logo-width * 0.6;
      padding: $logo-width * 0.2 $logo-width * 0.2;
    }
  }

  .to-login, .experience {
    height: 2.7rem;
    margin: 0 5rem 0 5rem;
    border-radius: 2.7 * 0.5rem;
    font-size: $font-size-l;
    font-weight: bold;
    text-align: center;
    line-height: 2.7rem;
  }

  .to-login {
    background-color: $color-bgc;
    margin-top: 36rem;
    margin-bottom: 1rem;
    color: $color-theme-bgc-d;
  }

  .experience {
    background-color: $color-theme-bgc-d;
    border: 1px solid $color-bgc;
  }

  .agreement {
    height: 2.7rem;
    margin: 2.2rem 5rem 0 5rem;
    i {
      font-style: normal;
      font-size: $font-size-s;
    }
    .agree {
      color: $color-text-l;
    }
    .agree-content {
      color: $color-text-ll;
    }
  }
}
</style>