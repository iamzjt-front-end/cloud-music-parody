<template>
  <div id="EmailLogin">
    <van-nav-bar title="邮箱登录" right-text="" left-arrow @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" size="24" color="#333739"/>
      </template>
    </van-nav-bar>
    <div class="cue">
      <p>登录体验更多精彩</p>
      <i>未注册邮箱登陆后将自动创建账号</i>
    </div>
    <div>
      <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="请填写163网易邮箱"
          :rules="[{ required: true }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true }]"
      />
      <div style="margin: 28px 16px 0 16px;">
        <van-button round block type="info" color="#333739" :disabled="!email || !password" native-type="button"
                    @click="emailLogin">立即登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant';
import {mapMutations} from 'vuex';

export default {
  name: "EmailLogin",
  data() {
    return {
      email: '', // 163 网易邮箱
      password: '', // 密码
    };
  },
  methods: {
    ...mapMutations(['changeLogin']),
    // 返回开始页面
    onClickLeft() {
      this.$router.push({path: '/passwordlogin'});
    },
    // 邮箱登录
    emailLogin() {
      this.$api.login.emailLogin({
        email: this.email, // 163 网易邮箱
        password: this.password, // 密码
      }).then(res => {
        if (res.data.code == 502) { // 密码错误
          Toast.fail(res.data.message);
          this.password = '';
        } else if (res.data.code == 200) { // 登录成功
          // 将用户token保存到localStorage和vuex中
          this.$store.commit('changeLogin', res.data.token);
          Toast.success('登录成功');
          this.$router.push('/home');
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";

#EmailLogin {
  width: 100%;
  height: 100vh;
  background-color: $color-bgc;
  overflow: hidden; // 触发BFC，解决外边距塌陷
  position: relative;

  .cue {
    width: 100%;
    height: 4rem;
    padding: 1rem;

    p {
      color: $color-text-dd;
      font-size: $font-size-xl;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    i {
      color: $color-text-ld;
      font-size: $font-size-s;
    }
  }
}
</style>