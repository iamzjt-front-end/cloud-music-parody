<template>
  <div id="song-list-square">
    <!-- 顶栏 -->
    <top-bar @leftClick="back">
      <i class="iconfont icon-back" slot="left"></i>
      <h1 slot="center">歌单广场</h1>
    </top-bar>
    <!-- 标签栏 -->
    <div class="song-list-square-content">
      <van-tabs ref="tabs" animated @click="toggle">
        <van-tab v-for="(item, index) in tagList" :title="item.name" :key="index" v-model="active"
                 title-style="font-size: 16px">
          <div class="loading" v-if="!highList.length">
            <van-loading size="24px" color="#323233" text-color="#323233">加载中...</van-loading>
          </div>
          <div class="tag-content" v-if="highList.length">
            <scroll :data="{high: highList}">
              <div class="song-list-wrapper">
                <song-list-item v-for="(item1, index1) in highList" :key="index1" @click.native="toRecList(item1)">
                  <img :src="item1.coverImgUrl" slot="img" @load="load">
                  <p slot="description">{{ item1.description }}</p>
                </song-list-item>
              </div>
            </scroll>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import TopBar from "components/TopBar";
import SongListItem from "components/SongListItem";
import Scroll from "components/scroll/Scroll";

export default {
  name: "SongListSquare",
  components: {
    TopBar,
    SongListItem,
    Scroll
  },
  data() {
    return {
      active: 0,
      tagList: [], // 歌单标签列表
      highList: [], // 精品歌单列表
    }
  },
  methods: {
    // 返回主页
    back() {
      this.$router.go(-1);
    },
    // 精品歌单标签列表获取
    playListTagsGet() {
      return this.$api.found.playListTagsQry();
    },
    // 获取精品歌单获取
    highListGet(val, updateTime) {
      this.$api.found.highListQry({
        cat: val,
        limit: 18,
        before: updateTime ? updateTime : null,
      }).then(res => {
        this.highList = res.data.playlists;
      })
      // cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
      // limit: 取出歌单数量 , 默认为 20
      // before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
    },
    toggle(name, title) {
      this.highList = [];
      this.highListGet(title);
    },
    load() {
      if (!this.loading) {
        this.loading = true;
        // this.$nextTick(() => {
        //   let songListBox = document.querySelector('.song-list-box');
        //   let songListItemWidth = document.querySelectorAll('.song-list-item')[0].clientWidth;
        //   songListBox.style.width = songListItemWidth * 6 + 'px';
        //   this.recScrollInit();
        // })
      }
    },
    // 跳转去歌单
    toRecList(val) {
      this.$router.push({
        name: 'rec-list',
        params: {
          id: val.id,
          imgUrl: val.coverImgUrl
        }
      });
    },
  },
  mounted() {
    this.playListTagsGet().then(res => {
      this.tagList = res.data.tags;
      // this.$refs.tabs.resize();
      this.highListGet(this.tagList[0].name);
    });
  }
}
</script>

<style lang="scss" scoped>
#song-list-square {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background-color: #fff;

  .top-bar {
    color: #323233;
    background-color: transparent;
    position: relative;
    z-index: 81;

    h1 {
      line-height: 54px;
      font-size: 1.1rem;
    }

    .icon-back {
      font-size: 1.1rem;
    }
  }

  .song-list-square-content {
    position: fixed;
    top: 54px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;

    .loading {
      padding-top: 1rem;
      text-align: center;
    }

    .tag-content {
      width: 100vw;
      height: calc(100vh - 54px - 44px);
      background-color: #fff;
      padding: 0 1rem;
      overflow: hidden;

      .song-list-wrapper {
        float: left;
        padding: 5px 0;

        .song-list-item {
          width: calc((100vw - 2rem) / 3);
          height: calc((100vw - 2rem) * 10 / 21);
        }
      }
    }
  }
}
</style>