<template>
  <div id="mine">
    <!-- 顶栏 -->
    <top-bar>
      <div class="settings" slot="left">
        <i class="iconfont icon-settings"></i>
        <!-- todo 点击进入设置 -->
      </div>
      <div class="title" slot="center">
        <!-- todo 上划显示 id -->
      </div>
    </top-bar>
    <!-- 我的 -->
    <div class="mine-home">
      <div class="left">
        <img :src="avatarUrl">
      </div>
      <div class="right">
        <div class="id-and-lv">
          <h1>{{ nickname }}</h1>
          <div class="icon-vip-box">
            <i class="iconfont icon-vip"></i>
          </div>
          <span>{{ 'lv.' + level }}</span>
        </div>
        <div class="to-my-home" @click="toMyHome">
          <i class="iconfont icon-xiala"></i>
        </div>
      </div>
    </div>
    <!-- 音乐应用 -->
    <div class="music-applications">

    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {Toast} from "vant";

export default {
  name: "Mine",
  components: {
    TopBar,
  },
  data() {
    return {
      avatarUrl: '', // 头像
      nickname: '', // 昵称
      backgroundUrl: '', // 主页背景图片
      level: '', // 用户等级
    }
  },
  methods: {
    // 获取账号信息
    userAccountGet() {
      let that = this;
      this.$api.mine.userAccountGet().then(res => {
        that.avatarUrl = res.data.profile.avatarUrl;
        that.nickname = res.data.profile.nickname;
        that.backgroundUrl = res.data.profile.backgroundUrl;
      })
    },
    // 获取用户等级信息
    userLevelGet() {
      let that = this;
      this.$api.mine.userLevelGet().then(res => {
        that.level = res.data.data.level;
      })
    },
    // 去主页
    toMyHome() {
      Toast('emmmm, 还没开发好...');
    }
  },
  created() {
    this.userAccountGet();
    this.userLevelGet();
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#mine {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  color: #000000;

  .top-bar {
    box-shadow: none;

    .icon-settings, .icon-distinguish {
      color: $color-text-ddd;
      font-size: $font-size-xxxl;
    }
  }

  .mine-home {
    width: 100%;
    height: 6rem;
    display: flex;

    .left {
      width: 6rem;
      height: 100%;
      position: relative;

      img {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        margin: 1.2rem 1.2rem;
      }

      &::after {
        content: '';
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        position: absolute;
        top: 19%;
        left: 19%;
        transform: scale(0.85);
        border: 1px solid #e3e3e3;
      }
    }

    .right {
      width: calc(100% - 6rem);
      height: 100%;
      display: flex;

      .id-and-lv {
        width: calc(100% - 3rem);
        height: 100%;

        h1 {
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          font-size: 1.1rem;
          font-weight: bolder;
          margin-top: 1.2rem;
          margin-bottom: 0.2rem;
        }

        .icon-vip-box {
          float: left;
          width: 1.5rem;
          height: 1.2rem;
          text-align: center;
          line-height: 1.2rem;

          .icon-vip {
            color: #323233;
            font-size: 1.3rem;
          }
        }

        span {
          float: left;
          width: 3rem;
          height: 1.2rem;
          font-size: 0.75rem;
          font-weight: bolder;
          color: #323233;
          text-align: center;
          line-height: 1.2rem;
        }
      }

      .to-my-home {
        width: 3rem;
        height: 100%;
        position: relative;

        .icon-xiala {
          position: absolute;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: 1rem;
          font-weight: bolder;
          color: #292929;
        }
      }
    }
  }

  .music-applications {

  }
}
</style>