<template>
  <div id="found">
    <!-- 顶栏 -->
    <top-bar @leftClick="toSetting">
      <i class="iconfont icon-settings" slot="left"></i>
      <!-- todo 点击进入设置 -->
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
      <i class="iconfont icon-distinguish" slot="right"></i>
      <!-- todo 听歌识曲功能 -->
    </top-bar>
    <div class="found-content">
      <scroll ref="scroll" :data="{recSong: recSongList, charts: chartsList}">
        <div>
          <!-- 轮播图 -->
          <div class="banner-wrapper">
            <div class="swiper-wrapper" ref="swiper">
              <div class="swiper-content">
                <div v-for="(item, index) in images" :key="index">
                  <img :src="item">
                </div>
              </div>
            </div>
            <!-- todo 轮播图下方小圆点 -->
            <div class="dots-wrapper">
            <span class="dot" v-for="(item, index) in images" :key="index"
                  :class="{'active': currentPageIndex === index}"></span>
            </div>
          </div>
          <!-- 快捷菜单 -->
          <div class="shortcut-menu">
            <shortcut-menu></shortcut-menu>
          </div>
          <div class="line"></div>
          <!-- 推荐歌单专栏 -->
          <column class="rec-list" :more="'rec'">
            <h1 slot="title">推荐歌单</h1>
            <div class="song-list" slot="item" ref="songList">
              <div class="song-list-box">
                <song-list-item v-for="(item, index) in this.recSongList" :key="index" @click.native="toRecList(item)">
                  <img :src="item.picUrl" slot="img" @load="recImgLoad">
                  <p slot="description">{{ item.name }}</p>
                </song-list-item>
              </div>
            </div>
          </column>
          <div class="wide-line"></div>
          <!-- 排行榜专栏 -->
          <column class="char-list" :more="'char'">
            <h1 slot="title">排行榜</h1>
            <div class="charts" slot="item" ref="charts">
              <div class="charts-box">
                <charts-item v-for="(item, index) in this.chartsList" :key="index"
                             :chartsList="chartsList" :index="index" @click.native="toRankList(item)">
                  <h1 slot="title">{{ item.name }}</h1>
                </charts-item>
              </div>
            </div>
          </column>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import ShortcutMenu from "@/components/ShortcutMenu";
import Column from "@/components/Column";
import SongListItem from "@/components/SongListItem";
import ChartsItem from "@/components/ChartsItem";
import Scroll from "@/components/scroll/Scroll";
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import {mapState, mapMutations} from 'vuex';

BScroll.use(Slide);

import Vue from 'vue';
import {Lazyload, Toast} from 'vant';

Vue.use(Lazyload);

export default {
  name: "Found",
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
      images: [], // 轮播图片列表
      currentPageIndex: 0, // 轮播图默认位置
      recSongList: [], // 推荐歌单列表
      chartsList: [], // 排行榜歌单列表
    }
  },
  computed: {
    ...mapState(['expVersion']),
  },
  methods: {
    ...mapMutations(['updateChartsList', 'updateSingerChartsList']),
    onSearch(val) {
      // todo 搜索功能
      Toast(val);
    },
    // 获取轮播图
    bannerImageGet() {
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
          this.$nextTick(() => {
            this.swiperSliderInit();
          })
        }
      })
    },
    // 轮播图初始化
    swiperSliderInit() {
      let that = this;
      this.swiperSlider = new BScroll(this.$refs.swiper, {
        scrollX: true,
        scrollY: false,
        slide: {
          threshold: 0.1,
          loop: true,
          autoplay: true,
          easing: 'transition-timing-function',
          interval: '6666', // 距离下一次播放的间隔
          speed: '400', // 切换 Page 动画的默认时长
        },
        useTransition: true,
        momentum: false, // 当使用 slide 时，这个值需要设置为 false，用来避免惯性动画带来的快速滚动时的闪烁的问题和快速滑动时一次滚动多页的问题
        bounce: false, // bounce 值需要设置为 false，否则会在循环衔接的时候出现闪烁
        stopPropagation: true,
        probeType: 2, // 如果你想通过监听 slideWillChange 事件，在用户拖动 slide 时，实时获取到 slide 的 PageIndex 的改变，需要设置 probeType 值为 2 或者 3
      })
      this.swiperSlider.on('slideWillChange', (page) => {
        that.currentPageIndex = page.pageX;
      })
    },
    // 获取推荐歌单
    songListGet() {
      let that = this;
      this.$api.found.recSongListQry().then(res => {
        if (res) {
          that.recSongList = res.data.recommend.slice(0, 6);
        }
      })
    },
    // 推荐歌单容器宽度设置
    recImgLoad() {
      if (!this.recImgLoaded) {
        this.recImgLoaded = true
        this.$nextTick(() => {
          let songListBox = document.querySelector('.song-list-box');
          let songListItemWidth = document.querySelectorAll('.song-list-item')[0].clientWidth;
          songListBox.style.width = songListItemWidth * 6 + 'px';
          this.recScrollInit();
        })
      }
    },
    // 推荐歌单横向滚动初始化
    recScrollInit() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.songList, {
            startX: 0,  // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh() //如果dom结构发生改变调用该方法
        }
      })
    },
    // 跳转去推荐歌单
    toRecList(val) {
      this.$router.push({
        name: 'rec-list',
        params: {
          id: val.id,
          imgUrl: val.picUrl
        }
      });
    },
    // 跳转去排行榜歌单
    toRankList(val) {
      this.$router.push({
        name: 'rank-list',
        params: {
          id: val.id,
          imgUrl: val.coverImgUrl
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
          this.updateChartsList(res.data.list);
          this.updateSingerChartsList(res.data.artistToplist);
          this.$nextTick(() => {
            let chartsBox = document.querySelector('.charts-box');
            let chartsItemWidth = document.querySelectorAll('.charts-item')[0].clientWidth;
            chartsBox.style.width = chartsItemWidth * 6 + 'px';
            this.chartsSliderInit();
          })
        }
      })
    },
    // 榜单轮播初始化
    chartsSliderInit() {
      this.chartsScroll = new BScroll(this.$refs.charts, {
        scrollX: true,
        scrollY: false,
        slide: {
          threshold: 0.1,
          loop: false,
          autoplay: false,
          easing: 'transition-timing-function',
        },
        momentum: false,
        bounce: false,
        stopPropagation: false
      })
    },
    // 去设置
    toSetting() {
      this.$bus.$emit('toSetting');
    }
  },
  created() {
    this.bannerImageGet();
    this.songListGet()
    this.chartsGet();
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#found {
  width: 100%;
  height: calc(100vh - 50px);

  .top-bar {
    background-color: #fff !important;

    .icon-settings, .icon-distinguish {
      color: $color-text-ddd;
      font-size: $font-size-xxxl;
    }
  }

  .found-content {
    position: fixed;
    top: 54px;
    left: 0;
    bottom: 50px;
    right: 0;
    background-color: $color-bgc;
    width: 100%;
    height: calc(100vh - 54px - 50px);
    overflow: hidden;

    .banner-wrapper {
      width: 100vw;
      height: 39vw;
      position: relative;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-content {
          width: 1000%;
          height: 100%;

          div {
            display: inline-block;
            width: 100vw;
            height: 100%;
            padding: 0.5rem 1rem 0.2rem 1rem;
            white-space: nowrap;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;

            img {
              width: 100%;
              border-radius: 8px;
            }
          }
        }
      }

      .dots-wrapper {
        width: 36vw;
        height: 5px;
        text-align: center;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate3d(-50%, 0, 1px);

        .dot {
          display: inline-block;
          margin: 0 2px;
          width: 9px;
          height: 2px;
          border-radius: 1px;
          background: #eee;
          opacity: 0.5;
        }

        .active {
          opacity: 1;
        }
      }
    }

    .line {
      height: 1px;
      background-color: #e6e6e6;
      margin-top: 0.8rem;
    }

    .rec-list {
      height: 13.5rem;

      .song-list {
        width: 100%;
        height: 100%;

        .song-list-box {
          height: 100%;

          .song-list-item {
            float: left;
          }
        }
      }
    }

    .wide-line {
      height: 9px;
      background-color: #f8f8f8;
    }

    .char-list {
      height: 18.5rem;

      .charts {
        width: 100%;
        height: 100%;

        .charts-box {
          height: 100%;
        }
      }
    }
  }
}
</style>