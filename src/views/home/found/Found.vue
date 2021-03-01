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
    <!-- 特色专栏 -->
    <column>
      <h1 slot="title">推荐歌单</h1>
      <div class="song-list" slot="item">
        <song-list-item v-for="(item, index) in this.songList" :key="index">
          <img :src="item.picUrl" slot="img">
          <p slot="description">{{ item.name }}</p>
        </song-list-item>
      </div>
    </column>
  </div>
</template>

<script>
import {Toast} from 'vant'
import TopBar from "@/components/TopBar";
import ShortcutMenu from "@/components/ShortcutMenu";
import Column from "@/components/Column";
import SongListItem from "@/components/SongListItem";

import Vue from 'vue';
import {Lazyload} from 'vant';

Vue.use(Lazyload);

export default {
  name: "found",
  components: {
    TopBar,
    ShortcutMenu,
    Column,
    SongListItem,
  },
  data() {
    return {
      value: '',
      images: [],
      imgHeight: window.innerWidth * 193 / 522,
      songList: [],
    }
  },
  methods: {
    onSearch(val) {
      // todo 搜索功能
      Toast(val);
    },
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
    }
  },
  mounted() {
    this.bannerImageQry();
    this.songList = this.$store.state.songList.slice(0, 6);
    console.log('歌单：', this.songList)
  },
  updated() {
    // this.$refs.swipe.resize();
    // 可能是我的用法不对, 官方提供的重绘方法还是不能正确计算出高度
    // 解决 vant UI swipe 组件, 每次页面重绘的时候, 计算不出正确高度的bug
    let img = document.querySelector('.swiper').querySelectorAll('img');
    for (let item of img) {
      item.style.height = this.imgHeight + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#found {
  width: 100%;
  height: 100vh;
  background-color: $color-bgc;

  .icon-settings, .icon-distinguish {
    color: $color-text-ddd;
    font-size: $font-size-xxxl;
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
    height: 0.04rem;
    background-color: #e5e5e5;
    margin-top: 0.8rem;
  }
}
</style>