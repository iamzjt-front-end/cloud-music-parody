<template>
  <div id="mine">
    <!-- 顶栏 -->
    <top-bar @leftClick="toSetting">
      <i class="iconfont icon-settings" slot="left"></i>
      <!-- todo 点击进入设置 -->
      <div class="title" slot="center" ref="title">
        <div class="img-box">
          <img :src="avatarUrl">
        </div>
        <h1>{{ nickname }}</h1>
      </div>
    </top-bar>
    <div class="mine-content" ref="mineContent">
      <scroll :data="{play: playlist}" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
        <div class="mine-scroll-wrapper">
          <!-- 我的 -->
          <div class="mine-home" ref="mineHome">
            <div class="left">
              <img :src="avatarUrl" v-show="avatarUrl">
            </div>
            <div class="right">
              <div class="id-and-lv">
                <h1>{{ nickname }}</h1>
                <div class="icon-vip-box">
                  <i class="iconfont icon-vip"></i>
                </div>
                <span v-show="level">{{ 'lv.' + level }}</span>
              </div>
              <div class="to-my-home" @click="toMyHome">
                <i class="iconfont icon-xiala"></i>
              </div>
            </div>
          </div>
          <!-- 音乐应用 -->
          <div class="music-application">
            <music-application-item v-for="(item, index) in musicApplicationList" :key="index" :item="item"/>
          </div>
          <!-- 我喜欢的音乐 -->
          <div class="i-like-music">
            <div class="like-cover-img" @click="toRecList(likeSongList[0])">
              <img :src="likeCoverImgUrl" v-show="avatarUrl">
            </div>
            <div class="i-like-info" @click="toRecList(likeSongList[0])">
              <h2>我喜欢的音乐</h2>
              <p>{{ likeTrackCount + '首' }}</p>
            </div>
            <div class="heartbeat-mode">
              <i class="iconfont icon-heartbeat"></i>
              <span> 心动模式</span>
            </div>
          </div>
          <!-- 歌单tab栏 -->
          <div class="song-list-tab">
            <!-- todo 暂时只做收藏歌单, 创建歌单 和 歌单助手以后再做 -->
            收藏歌单
          </div>
          <!-- 收藏歌单 -->
          <div class="favorite-song-list">
            <div class="favorite-song-info">
              <div class="left">
                收藏歌单 <span v-show="favoriteSongList.length">({{ subPlaylistCount + '个' }})</span>
              </div>
              <div class="right">
                <i class="iconfont icon-more"></i>
              </div>
            </div>
            <div class="loading" v-if="!favoriteSongList.length">
              <van-loading size="24px" color="#323233" text-color="#323233">加载中...</van-loading>
            </div>
            <div class="favorite-song-content" v-if="favoriteSongList.length">
              <favorite-song-item v-for="(item, index) in favoriteSongList" :key="index" :item="item"
                                  @click.native="toRecList(item)"/>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {Toast} from "vant";
import MusicApplicationItem from "components/MusicApplicationItem";
import FavoriteSongItem from "components/FavoriteSongItem";
import Scroll from "components/scroll/Scroll";

export default {
  name: "Mine",
  components: {
    TopBar,
    MusicApplicationItem,
    FavoriteSongItem,
    Scroll,
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
          icon: 'icon-bendi',
          title: '本地/下载'
        }, {
          icon: 'icon-yunpan',
          title: '云盘'
        }, {
          icon: 'icon-yigou',
          title: '已购'
        }, {
          icon: 'icon-zuijinbofang',
          title: '最近播放'
        }, {
          icon: 'icon-haoyou',
          title: '我的好友'
        }, {
          icon: 'icon-shoucang',
          title: '收藏和赞'
        }, {
          icon: 'icon-paobu',
          title: '跑步FM'
        }, {
          icon: 'icon-zhumian',
          title: '助眠解压'
        }
      ], // 音乐应用列表
      likeCoverImgUrl: '', // 我喜欢的音乐歌单 封面
      likeTrackCount: '', // 我喜欢的音乐歌单 歌曲数量
      subPlaylistCount: '', // 用户收藏歌单数量
      likeSongList: [], // 我喜欢的音乐歌单列表
      createSongList: [], // 我创建的歌单列表
      favoriteSongList: [], // 我收藏的歌单
      playlist: [], // 用户歌单
      probeType: 3, // better-scroll 参数
      listenScroll: true, // better-scroll 参数
      scrollY: 0, // 纵向滚动距离
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
        that.userPlaylistGet();
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
    // 跳转去歌单
    toRecList(val) {
      this.$router.push({
        name: 'rec-list',
        params: {
          id: val.id,
          imgUrl: val.picUrl
        }
      });
    },
    // 获取用户收藏歌单数量
    userSubcountGet() {
      let that = this;
      this.$api.mine.userSubcountGet().then(res => {
        that.subPlaylistCount = res.data.subPlaylistCount;
      })
    },
    // 获取用户歌单
    userPlaylistGet() {
      let that = this;
      this.$api.mine.userPlaylistGet({
        uid: this.userId,
      }).then(res => {
        res.data.playlist.forEach(function (item) {
          item.picUrl = item.coverImgUrl;
        })
        that.playlist = res.data.playlist; // 用户歌单
        let lastIndex = res.data.playlist.length - 1;
        that.likeSongList = res.data.playlist.slice(0, 1); // 我喜欢的音乐歌单列表
        that.likeCoverImgUrl = that.likeSongList[0].coverImgUrl;
        that.likeTrackCount = that.likeSongList[0].trackCount;
        that.createSongList = res.data.playlist.slice(1, 2); // 我创建的歌单列表
        that.favoriteSongList = res.data.playlist.slice(2, lastIndex); // 我收藏的歌单
      })
    },
    // 监听 BScroll 的滚动
    scroll(pos) {
      this.scrollY = pos.y;

      this.$refs.mineHome.style.opacity = (this.scrollY + 50) / 50;

      let topBar = document.querySelector('.top-bar');

      if (this.scrollY >= -5) {
        topBar.style.backgroundColor = '#fafafa';
      } else if (this.scrollY < -5) {
        topBar.style.backgroundColor = 'transparent';
      } else if (-this.scrollY >= 50) {
        topBar.style.backgroundColor = '#fff';
      }

      if (this.scrollY < 0 && -this.scrollY >= 50) {
        this.$refs.mineContent.style.overflow = 'hidden';
        this.$refs.title.style.opacity = '1';
        this.$refs.title.style.transform = 'translateY(0)';
      } else {
        this.$refs.mineContent.style.overflow = 'visible';
        this.$refs.title.style.opacity = '0';
        this.$refs.title.style.transform = 'translateY(-25%)';
      }
    },
    // 去设置
    toSetting() {
      this.$bus.$emit('toSetting');
    }
  },
  created() {
    this.userAccountGet();
    this.userLevelGet();
    this.userSubcountGet();
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#mine {
  width: 100%;
  height: calc(100vh - 50px);

  .top-bar {
    background-color: #fafafa;
    transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;

    .icon-settings {
      color: $color-text-ddd;
      font-size: $font-size-xxxl;
    }

    .title {
      width: 100%;
      height: 100%;
      opacity: 0;
      transform: translateY(-25%);
      transition: all 0.3s linear;
      -webkit-transition: all 0.3s linear;
      display: flex;
      justify-content: center;
      align-items: center;

      .img-box {
        width: 1.5rem;
        height: 1.5rem;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        &::after {
          content: '';
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          position: absolute;
          top: -5%;
          left: -5%;
          transform: scale(0.8);
          border: 1px solid #e3e3e3;
        }
      }

      h1 {
        height: 1.5rem;
        line-height: 1.5rem;
        padding-left: 6px;
        font-size: 14px;
        color: #333334;
      }
    }
  }

  .mine-content {
    position: fixed;
    top: 54px;
    right: 0;
    bottom: 50px;
    left: 0;
    width: 100%;
    background-color: #fafafa;
    //overflow: hidden;

    .mine-scroll-wrapper {
      padding-bottom: 15px;
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
            color: #333334;
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
      padding: 0.5rem 1rem;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-wrap: wrap;
    }

    .i-like-music {
      margin: 0 1rem;
      height: 5rem;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.03);
      padding: 0.9rem;

      .like-cover-img {
        display: inline-block;
        width: 3.2rem;
        height: 3.2rem;
        background-color: #f5f5f5;
        border-radius: 10px;
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
        text-align: center;
        line-height: 3.2rem;
        color: #333334;

        .icon-heartbeat {
          vertical-align: middle;
        }

        span {
          font-size: 0.8rem;
        }
      }
    }

    .song-list-tab {
      width: 100%;
      height: 3rem;
      font-size: 1rem;
      color: #636364;
      text-align: center;
      line-height: 3rem;
    }

    .loading {
      padding-top: 1rem;
      text-align: center;
    }

    .favorite-song-list {
      margin: 0 1rem;
      padding: 1rem 0;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.03);

      .favorite-song-info {
        width: 100%;
        height: 1.5rem;

        .left {
          float: left;
          width: 8rem;
          height: 100%;
          line-height: 1.2rem;
          color: #999999;
          font-size: 0.75rem;
          padding-left: 12px;
        }

        .right {
          float: right;
          width: 2.4rem;
          height: 100%;
          color: #999999;
          text-align: center;

          .icon-more {
            font-size: 1.1rem;
          }
        }
      }

      .favorite-song-content {
        width: 100%;
      }
    }
  }
}
</style>