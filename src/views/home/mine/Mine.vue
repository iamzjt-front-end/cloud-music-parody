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
    <div class="music-application">
      <music-application-item v-for="(item, index) in musicApplicationList" :key="index" :data="item"/>
    </div>
    <!-- 我喜欢的音乐 -->
    <div class="i-like-music">
      <div class="like-cover-img">
        <img :src="likeCoverImgUrl">
      </div>
      <div class="i-like-info">
        <h2>我喜欢的音乐</h2>
        <p>{{ likeList.length + '首' }}</p>
      </div>
      <div class="heartbeat-mode">
        <div class="icon-heartbeat-box">
          <i class="iconfont icon-heartbeat"></i>
          <span>心动模式</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {Toast} from "vant";
import MusicApplicationItem from "components/MusicApplicationItem";

export default {
  name: "Mine",
  components: {
    TopBar,
    MusicApplicationItem,
  },
  data() {
    return {
      avatarUrl: '', // 头像
      nickname: '', // 昵称
      backgroundUrl: '', // 主页背景图片
      userId: '', // 用户id
      level: '', // 用户等级
      musicApplicationList: [
        {
          icon: '',
          title: '本地/下载'
        }, {
          icon: '',
          title: '云盘'
        }, {
          icon: '',
          title: '已购'
        }, {
          icon: '',
          title: '最近播放'
        }, {
          icon: '',
          title: '我的好友'
        }, {
          icon: '',
          title: '收藏和赞'
        }, {
          icon: '',
          title: '我的播客'
        }, {
          icon: '',
          title: '音乐应用'
        }
      ], // 音乐应用列表
      likeList: [], // 已喜欢的音乐列表
      likeCoverImgUrl: '', // 我喜欢的音乐封面
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
        that.userId = res.data.profile.userId;
        that.likeListGet();
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
    },
    // 已喜欢的音乐列表获取
    likeListGet() {
      let that = this;
      this.$api.mine.likeListGet({
        uid: this.userId,
      }).then(res => {
        that.likeList = res.data.ids;
        that.likeCoverImgGet(res.data.ids[0]);
      })
    },
    // 封面获取
    likeCoverImgGet(val) {
      let that = this;
      this.$api.player.songDetQry({
        ids: val
      }).then(res => {
        that.likeCoverImgUrl = res.data.songs[0].al.picUrl;
      })
    },
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

  .music-application {
    margin: 0 1rem 1rem;
    height: 11rem;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.03);
  }

  .i-like-music {
    margin: 0 1rem 1rem;
    height: 5rem;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.03);
    padding: 0.9rem;

    .like-cover-img {
      display: inline-block;
      width: 3.2rem;
      height: 3.2rem;
      // 让子元素呈现 3D 转换
      transform-style: preserve-3d;
      position: relative;
      vertical-align: middle;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }

      &::before {
        content: '';
        display: inline-block;
        width: 85%;
        height: 85%;
        background-color: #f2f2f2;
        border-radius: 10px;
        position: absolute;
        top: -0.2rem;
        left: 7.5%;
        // 使用Z轴进行 3D 转换
        transform: translateZ(-1px);
      }

      //&::after {
      //  content: '';
      //  //width: 85%;
      //  //height: 85%;
      //  position: absolute;
      //  top: 0;
      //  left: 0;
      //}
    }

    .i-like-info {
      display: inline-block;
      width: calc(100% - 9rem);
      height: 3.2rem;
      vertical-align: middle;
      padding-left: 10px;

      h2 {
        display: inline-block;
        width: 100%;
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 1.05rem;
        color: #333334;
      }

      p {
        display: inline-block;
        width: 100%;
        height: 1.4rem;
        line-height: 1.4rem;
        font-size: 0.8rem;
        color: #9c9c9c;
      }
    }

    .heartbeat-mode {
      display: inline-block;
      width: 5.8rem;
      height: 3.2rem;
      vertical-align: middle;
      background-color: pink;

      .icon-heartbeat-box {
        display: inline-block;
        width: 5.8rem;
        height: 1.4rem;
        background-color: green;
      }
    }
  }
}
</style>