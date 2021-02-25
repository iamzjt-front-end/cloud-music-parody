<template>
  <div id="passwordLogin">
    <!-- <top-bar></top-bar> -->
    <div class="cue">
      <p>登陆体验更多精彩</p>
      <i>未注册手机号登陆后将自动创建账号</i>
    </div>
    <van-form @submit="onSubmit">
      <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "PasswordLogin",
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
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
    padding: 1rem 0.5rem;

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