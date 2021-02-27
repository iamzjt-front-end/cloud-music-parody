<template>
  <div id="found">
    <nav-bar>
      <div class="settings" slot="left">
        <i class="iconfont icon-settings"></i>
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
      </div>
    </nav-bar>
    <div class="swiper">

    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import NavBar from "@/components/NavBar";

export default {
  name: "found",
  components: {
    NavBar,
  },
  data() {
    return {
      value: '',
      images: [],
    }
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    bannerImageQry() {
      // 0: pc
      // 1: android
      // 2: iphone
      // 3: ipad
      this.$api.found.bannerImage('2').then(res => {
        if (res) {
          for (let item of res.data.banners) {
            this.images.push(item.imageUrl);
          }
        }
      })
    }
  },
  mounted() {
    this.bannerImageQry();
  },
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
}
</style>