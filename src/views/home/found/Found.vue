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
    <!-- 推荐歌单专栏 -->
    <column>
      <h1 slot="title">推荐歌单</h1>
      <div class="song-list" slot="item">
        <song-list-item v-for="(item, index) in this.songList" :key="index">
          <img :src="item.picUrl" slot="img">
          <p slot="description">{{ item.name }}</p>
        </song-list-item>
      </div>
    </column>
    <div class="wide-line"></div>
    <!-- 排行榜专栏 -->
    <column>
      <h1 slot="title">排行榜</h1>
      <div class="charts" slot="item">
        <charts-item v-for="(item, index) in this.chartsList" :key="index">
          <h1 slot="title">{{ item.name }}</h1>
          <div class="charts-rank" slot="top-three">
            <charts-rank-item v-for="(rankItem, index) in this.topThreeList" :key="index">
              <img src="" slot="img">
              <p slot="songIndex">{{ index + 1 }}</p>
              <p slot="songName">酒肉朋友酒肉朋友酒肉朋友</p>
              <p slot="songAuthor">- 李毅杰 PISSY/法老</p>
            </charts-rank-item>
          </div>
        </charts-item>
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
import ChartsItem from "@/components/ChartsItem";
import ChartsRankItem from "@/components/ChartsRankItem";

import Vue from 'vue';
import {Lazyload} from 'vant';

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
    ChartsRankItem,
  },
  data() {
    return {
      value: '',
      images: [],
      imgHeight: window.innerWidth * 193 / 522,
      songList: [],
      chartsList: [],
      topThreeList: [],
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
    // 获取每日推荐歌单
    songListGet() {
      let that = this;
      this.$api.found.recSongListQry().then(res => {
        if (res) {
          that.songList = res.data.recommend.slice(0, 6);
          that.updateSongList(res.data.recommend.slice(0, 6));
        }
      })
    },
    // 获取榜单
    chartsGet() {
      let that = this;
      this.$api.found.chartsQry().then(res => {
        if (res) {
          console.log('排行榜：', res)
          that.chartsList = res.data.list.slice(0, 6);
          for (let item of that.chartsList) {
            this.$api.found.chartsDetQry({
              id: item.id
            }).then(res => {
              if (res) {
                console.log('排行榜详情：', res.data)
                that.topThreeList = res.data;
              }
            })
          }
        }
      })
    },
    // 获取榜单详情
    // chartsDetGet(val) {
    // this.$api.found.chartsDetQry({
    //   id: val
    // }).then(res => {
    //   if (res) {
    //     console.log('排行榜详情：', res.data)
    //     this.topThreeList = res.data;
    //   }
    // })
    // },
  },
  mounted() {
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
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#found {
  width: 100%;
  height: 100%;
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

  .wide-line {
    height: 0.55rem;
    background-color: #f8f8f8;
  }
}
</style>