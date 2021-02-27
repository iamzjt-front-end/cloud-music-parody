<template>
  <div id="found">
    <van-nav-bar>
      <template #left>
        <i class="iconfont icon-settings"></i>
      </template>
      <template #title>
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
      </template>
      <template #right>
        <i class="iconfont icon-distinguish"></i>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  name: "found",
  data() {
    return {
      value: '',
      images: [],
    };
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
}
</style>