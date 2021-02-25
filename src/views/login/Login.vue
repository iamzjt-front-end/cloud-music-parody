<template>
  <div id="login">
      <div class="login-logo">
        <i class="iconfont icon-logo"></i>
      </div>
    <div class="to-login" @click="judge(isChecked, 'login')">立即登录</div>
    <div class="experience" @click="judge(isChecked, 'experience')">游客体验</div>
    <div class="agreement animate__animated" ref="agreement">
      <van-checkbox v-model="isChecked" checked-color="#d7766b" icon-size="14px">
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
      isChecked: false,
      isShake: false,
    };
  },
  methods: {
    // 判断时否同意协议，同意以后再通过传值判断下一步做什么
    judge (val1, val2) {
      if (val1) { // 点击同意协议
        if (val2 == 'login') {
          console.log('登陆')
        } else {
          console.log('体验')
        }
      } else { // 未点击同意协议
        this.$refs.agreement.classList.add('animate__shakeX')
        let that = this
        setTimeout(function () {
          that.$refs.agreement.classList.remove('animate__shakeX')
        }, 500)
      }
    },
  }
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

    @keyframes scale {
      0% {
        transform: scale(1);
        border-radius: $logo-width * 1 * 0.5;
        opacity: 0.1;
      }
      50% {
        transform: scale(3);
        border-radius: $logo-width * 3 * 0.5;
        opacity: 0.05;
      }
      100% {
        transform: scale(6);
        border-radius: $logo-width * 6 * 0.5;
        opacity: 0;
      }
    }

    &::before, &::after {
      content: '';
      width: $logo-width;
      height: $logo-width;
      border-radius: $logo-width * 0.5;
      border: 0.01rem solid $color-text-ll;
      position: absolute;
    }

    &::before {
      animation: scale 6s linear 0s infinite;
    }

    &::after {
      left: 0;
      opacity: 0;
      animation: scale 6s linear 3s infinite;
    }

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