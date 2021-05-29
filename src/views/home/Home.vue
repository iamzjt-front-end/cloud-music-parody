<template>
  <div id="home">
    <div class="content">
      <!-- 内容区 -->
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <!-- tab栏 -->
    <tab-bar/>
    <!-- 弹出层 -->
    <van-popup v-model="popupShow" position="left" :style="{ width: '80%', height: '100%' }">
      <div class="popup">
        <div class="top-user-info">
          <img :src="avatarUrl">
          <h1>{{ nickname }}</h1>
        </div>
        <div class="log-out" @click="logout">退出登录</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
import {Dialog} from 'vant';

export default {
  name: "Home",
  data() {
    return {
      popupShow: false, // 控制弹出层显示隐藏
      avatarUrl: '', // 头像
      nickname: '', // 昵称
      userId: '', // 用户id
    }
  },
  components: {
    TabBar,
  },
  methods: {
    // 获取账号信息
    userAccountGet() {
      let that = this;
      this.$api.mine.userAccountGet().then(res => {
        that.avatarUrl = res.data.profile.avatarUrl;
        that.nickname = res.data.profile.nickname;
        that.userId = res.data.profile.userId;
      })
    },
    // 退出登录
    logout() {
      Dialog.confirm({
        title: '网易云音乐',
        message: '确定退出当前账号吗？ >_<',
      }).then(() => {
        // 跳转到开始页 并 清掉 token
        this.$api.login.logout().then(res => {
          if (res.data.code == 200) {
            localStorage.removeItem('token');
            this.$router.replace({
              path: '/start',
            });
          }
        })
      }).catch(() => {
        // on cancel
      });
    }
  },
  mounted() {
    this.$bus.$on('toSetting', () => {
      this.popupShow = true;
    })
    this.userAccountGet();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";

#home {
  width: 100vw;
  height: 100vh;

  .content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 50px;
    right: 0;
    z-index: 80;
  }

  .popup {
    width: 100%;
    height: 100%;

    .top-user-info {
      width: 100%;
      height: 4rem;

      img {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin: 1rem 10px 1rem 1rem;
        border-radius: 1rem;
        vertical-align: middle;
        border: 1px solid #ccc;
      }

      h1 {
        color: #2b2b2c;
        display: inline-block;
        width: auto;
        height: 4rem;
        line-height: 4rem;
        vertical-align: middle;
        font-size: 1rem;
        font-weight: bolder;
      }
    }

    .log-out {
      margin: 0 1rem;
      height: 3rem;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.08);
      color: #2b2b2c;
      text-align: center;
      line-height: 3rem;
    }
  }
}
</style>