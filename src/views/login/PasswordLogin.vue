<template>
  <div id="passwordLogin">
    <van-nav-bar
        title="手机号登录"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="cross" size="18" />
      </template>
    </van-nav-bar>>

    <div class="cue">
      <p>登录体验更多精彩</p>
      <i>未注册手机号登陆后将自动创建账号</i>
    </div>
    <van-form @submit="onSubmit">
      <van-field
          v-model="phoneNumber"
          name="手机号"
          label="手机号"
          placeholder="请填写手机号"
          :rules="[{ required: true }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true }]"
      />
      <div style="margin: 28px 16px 0 16px;">
        <van-button round block type="info" color="#333739" :disabled="!phoneNumber || !password" native-type="submit">立即登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "PasswordLogin",
  data() {
    return {
      phoneNumber: '',
      password: '',
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({path: '/login'});
    },
    onSubmit(values) {
      console.log('submit', values);
    },

  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";

#passwordLogin {
  width: 100%;
  height: 100vh;
  background-color: $color-bgc;
  overflow: hidden; // 触发BFC，解决外边距塌陷

  .cue {
    width: 100%;
    height: 3rem;
    padding: 0.8rem 1rem;

    p {
      color: black;
      font-size: $font-size-xl;
      margin-bottom: 0.5rem;
    }

    i {
      color: $color-text-ld;
      font-size: $font-size-s;
    }
  }
}
</style>