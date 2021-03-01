<template>
  <div id="passwordLogin">
    <van-nav-bar title="手机号登录" right-text="" left-arrow @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" size="24" color="#333739"/>
      </template>
    </van-nav-bar>
    <div class="cue">
      <p>登录体验更多精彩</p>
      <i>未注册手机号登陆后将自动创建账号</i>
    </div>
    <van-form @submit="onSubmit">
      <van-field
          v-model="phone"
          type="tel"
          name="phone"
          label="手机号"
          placeholder="请填写手机号"
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
        <van-button round block type="info" color="#333739" :disabled="!phone || !password" native-type="submit">立即登录
        </van-button>
      </div>
    </van-form>
    <a class="verification-code" @click="toVerCodeLogin">
      验证码登录
    </a>
    <a class="register" @click="toRegister">
      立即注册
    </a>
  </div>
</template>

<script>
import {Toast} from 'vant';
import {mapMutations} from 'vuex';

export default {
  name: "PasswordLogin",
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations(['changeLogin']),
    // 返回开始页面
    onClickLeft() {
      this.$router.push({path: '/start'});
    },
    // 登录
    onSubmit(values) {
      let that = this;
      this.$api.login.passwordLogin(values).then(res => {
        if (res.data.code == 502) { // 密码错误
          Toast.fail(res.data.message);
          this.password = '';
        } else if (res.data.code == 200) { // 登录成功
          // 将用户token保存到sessionStorage和vuex中
          that.changeLogin(res.data);
          Toast.success('登录成功');
          that.$router.push('/home');
          this.$api.login.recSongListQry().then(res => {
            console.log('每日推荐歌单：', res)
          })
        }
      })
    },
    // 验证码登录
    toVerCodeLogin() {
      Toast('正在开发中...');
    },
    // 注册
    toRegister() {
      Toast('正在开发中...');
    }
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

  .verification-code {
    display: block;
    float: right;
    color: $color-text-ld;
    margin: 1.5rem 2rem;
    font-size: $font-size-m;

    &:active {
      color: $color-text-d;
    }
  }

  .register {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    color: $color-text-lld;
    font-size: $font-size-m;

    &:active {
      color: $color-text-ld;
    }
  }
}
</style>