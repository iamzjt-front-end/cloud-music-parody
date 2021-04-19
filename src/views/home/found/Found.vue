<template>
  <div id="found">
    <!-- 顶栏 -->
    <top-bar>
      <div class="settings" slot="left">
        <i class="iconfont icon-settings"></i>
        <!-- todo 点击进入设置 -->
      </div>
      <div class="search" slot="center">
        <form action="/">
          <van-search
              v-model="value"
              shape="round"
              input-align="center"
              placeholder="请输入搜索关键词"
              background="#fff"
              @search="onSearch"
          />
        </form>
      </div>
      <div class="distinguish" slot="right">
        <i class="iconfont icon-distinguish"></i>
        <!-- todo 听歌识曲功能 -->
      </div>
    </top-bar>
    <scroll ref="scroll" :data="chartsList">
      <div>
        <!-- 轮播图 -->
        <div class="swiper">
          <van-swipe :autoplay="5000" indicator-color="#fff" ref="swipe">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image"/>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- todo 图片最下方被覆盖了一部分 -->
        <!-- 快捷菜单 -->
        <div class="shortcut-menu">
          <shortcut-menu></shortcut-menu>
        </div>
        <div class="line"></div>
        <!-- 推荐歌单专栏 -->
        <column class="rec-list">
          <h1 slot="title">推荐歌单</h1>
          <div class="song-list" slot="item">
            <song-list-item v-for="(item, index) in this.recSongList" :key="index" @click.native="toRecList(item)">
              <img :src="item.picUrl" slot="img">
              <p slot="description">{{ item.name }}</p>
            </song-list-item>
          </div>
        </column>
        <div class="wide-line"></div>
        <!-- 排行榜专栏 -->
        <column class="char-list">
          <h1 slot="title">排行榜</h1>
          <div class="charts" slot="item">
            <charts-item v-for="(item, index) in this.chartsList" :key="index"
                         :chartsList="chartsList" :index="index">
              <h1 slot="title">{{ item.name }}</h1>
            </charts-item>
          </div>
        </column>
      </div>
    </scroll>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import ShortcutMenu from "@/components/ShortcutMenu";
import Column from "@/components/Column";
import SongListItem from "@/components/SongListItem";
import ChartsItem from "@/components/ChartsItem";
import Scroll from "@/components/scroll/Scroll";

import Vue from 'vue';
import {Lazyload, Toast} from 'vant';

import {mapMutations} from 'vuex';

Vue.use(Lazyload);

export default {
  name: "found",
  components: {
    TopBar,
    ShortcutMenu,
    Column,
    SongListItem,
    ChartsItem,
    Scroll
  },
  data() {
    return {
      value: '',
      images: [],
      imgHeight: window.innerWidth * 193 / 522,
      recSongList: [], // 推荐歌单列表
      chartsList: [], // 排行榜歌单列表
    }
  },
  methods: {
    ...mapMutations(['updateSongList']),
    onSearch(val) {
      // todo 搜索功能
      Toast(val);
    },
    // 获取轮播图
    bannerImageQry() {
      // todo 判断不同设备来请求不同的轮播图片
      // 0: pc
      // 1: android
      // 2: iphone
      // 3: ipad
      this.$api.found.bannerImage({
        type: '2',
      }).then(res => {
        if (res) {
          for (let item of res.data.banners) {
            this.images.push(item.pic);
          }
        }
      })
    },
    // 获取推荐歌单
    songListGet() {
      let that = this;
      this.$api.found.recSongListQry().then(res => {
        if (res) {
          that.recSongList = res.data.recommend.slice(0, 6);
          this.$nextTick(() => {
            let songList = document.querySelector('.song-list');
            let songListItemWidth = document.querySelector('.song-list-item').clientWidth;
            songList.style.width = songListItemWidth * 6.5 + 'px';
          })
        }
      })
    },
    // 跳转去推荐歌单
    toRecList(val) {
      console.log(val);
      this.$router.push({
        name: 'rec-list',
        params: {
          id: val.id,
          imgUrl: val.picUrl
        }
      });
    },
    // 获取榜单
    chartsGet() {
      let that = this;
      this.$api.found.chartsQry().then(res => {
        if (res) {
          // console.log('排行榜：', res)
          that.chartsList = res.data.list.slice(0, 6);
          this.$nextTick(() => {
            let charts = document.querySelector('.charts');
            let chartsItemWidth = document.querySelector('.charts-item').clientWidth;
            charts.style.width = chartsItemWidth * 6.5 + 'px';
          })
        }
      })
    },
  },
  created() {
    this.bannerImageQry();
    this.songListGet();
    this.chartsGet();
  },
  updated() {
    // this.$refs.swipe.resize();
    // 可能是我的用法不对, 官方提供的重绘方法还是不能正确计算出高度
    // 解决 vant UI swipe 组件, 每次页面重绘的时候, 计算不出正确高度的bug
    let img = document.querySelector('.swiper').querySelectorAll('img');
    for (let item of img) {
      item.style.height = this.imgHeight + 'px'
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#found {
  width: 100vw;
  height: calc(100vh - 54px - 50px);

  position: fixed;
  top: 54px;
  left: 0;
  bottom: 50px;
  right: 0;

  background-color: $color-bgc;

  .top-bar {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;

    .icon-settings, .icon-distinguish {
      color: $color-text-ddd;
      font-size: $font-size-xxxl;
    }
  }

  .swiper {
    margin: 0.5rem 1rem 0.2rem 1rem;
    border-radius: 0.5rem;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .line {
    height: 1px;
    background-color: #e6e6e6;
    margin-top: 0.8rem;
  }

  .rec-list {
    height: 14.25rem;

    .song-list {
      height: 100%;
    }
  }

  .wide-line {
    height: 9px;
    background-color: #f8f8f8;
  }

  .char-list {
    height: 19rem;

    .charts {
      height: 100%;
    }
  }
}
</style>