<template>
  <div id="login">
      <div class="login-logo">
        <i class="iconfont icon-logo"></i>
      </div>
    <div class="to-login">立即登录</div>
    <div class="experience">游客体验</div>
    <div class="agreement">
      <van-checkbox v-model="checked" checked-color="#d7766b" icon-size="14px">
        <i class="agree">同意</i>
        <i class="agree-content">
          《服务条款》《隐私条款》《儿童隐私政策》
        </i>
      </van-checkbox>
    </div>
    <div class="copyright">
      MIT Licensed | Copyright © 2021-present IamZJT
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
    margin: 0 4rem;
    border-radius: 2.7 * 0.5rem;
    font-size: $font-size-l;
    font-weight: bold;
    text-align: center;
    line-height: 2.7rem;
  }

  .to-login {
    height: 2.7rem;
    background-color: $color-bgc;
    margin-top: 100vh * 0.7;
    margin-bottom: 1.1rem;
    color: $color-theme-bgc-d;
  }

  .experience {
    height: calc(2.7rem - 2px);
    background-color: $color-theme-bgc-d;
    border: 1px solid $color-bgc;
  }

  .to-login::before, .experience::before {
    content: '';
    width: calc(100% - 8rem);
    height: 2.7rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000;
    border-radius: inherit;
    opacity: 0;
  }

  .to-login:active::before, .experience:active::before {
    opacity: 0.06;
  }

  .agreement {
    height: 2.7rem;
    margin: 2.2rem 3rem 0 4.5rem;

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

  .copyright {
    font-size: $font-size-xxs;
    color: $color-text-ll;
    text-align: center;
    margin-top: 1rem;
  }
}
</style>