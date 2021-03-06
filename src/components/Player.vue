<template>
  <div id="player">
    <div class="obscured-glass">
      <top-bar>
        <i class="iconfont icon-xiala" slot="left"></i>
        <div class="singNmAndSinger" slot="center">
          <h1>歌曲名称</h1>
          <p>歌手</p>
        </div>
        <i class="iconfont icon-fenxiang" slot="right"></i>
      </top-bar>
      <!-- 唱片封面 -->
      <div class="record-cover-box">
        <div class="record-cover">
          <img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F15%2F20141215154216_HeKFJ.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617605020&t=04caff22525318c1197f606cab4f12cd"
              alt="">
        </div>
      </div>
      <!-- 其他选项 -->
      <div class="other-options">
        <music-operations>
          <i class="iconfont icon-aixin" slot="item1"></i>
          <i class="iconfont icon-xiazai" slot="item2"></i>
          <i class="iconfont icon-texiao" slot="item3"></i>
          <i class="iconfont icon-pinglun" slot="item4"></i>
          <i class="iconfont icon-more" slot="item5"></i>
        </music-operations>
      </div>
      <!-- 进度条 -->
      <div class="progress-bar">

      </div>
      <!-- 播放控制 -->
      <div class="play-control">
        <music-operations>
          <i class="iconfont icon-shunxu" slot="item1"></i>
          <i class="iconfont icon-shangyiqu" slot="item2"></i>
          <i class="iconfont icon-bofang" slot="item3"></i>
          <i class="iconfont icon-shangyiqu" slot="item4"></i>
          <i class="iconfont icon-bofangliebiao" slot="item5"></i>
        </music-operations>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import MusicOperations from "@/components/MusicOperations";

export default {
  name: "Player",
  components: {
    TopBar,
    MusicOperations,
  }
}
</script>

<style lang="scss" scoped>
$width-cover: 30vh;

#player {
  width: 100%;
  height: 100vh;
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F15%2F20141215154216_HeKFJ.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617605020&t=04caff22525318c1197f606cab4f12cd");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .obscured-glass {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(66px);
  }

  .top-bar {
    box-shadow: none;

    .icon-xiala, .icon-fenxiang {
      font-size: 1.25rem;
    }
  }

  .singNmAndSinger {
    width: 100%;
    height: 100%;

    h1, p {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 2rem;
    }

    h1 {
      height: 70%;
      font-size: 1.3rem;
      color: #ffffff;
    }

    p {
      height: 30%;
      font-size: 0.8rem;
      color: #deddde;
    }
  }

  .record-cover-box {
    width: 100%;
    height: calc(100vh - 54px - 10vh - 4rem - 15vh);
    position: relative;

    .record-cover {
      width: $width-cover;
      height: $width-cover;
      background-color: rosybrown;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .other-options {
    width: 95%;
    height: 10vh;
    margin: 0 auto;
  }

  .progress-bar {
    width: 100%;
    height: 4rem;
  }

  .play-control {
    width: 95%;
    height: 15vh;
    margin: 0 auto;

    .icon-bofang {
      font-size: 3.2rem;
    }
  }
}
</style>