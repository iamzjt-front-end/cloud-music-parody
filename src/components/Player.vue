<template>
  <div id="player">
    <top-bar>
      <i class="iconfont icon-xiala" slot="left"></i>
      <div class="singNmAndSinger" slot="center">
        <h1>歌曲名称</h1>
        <p>歌手</p>
      </div>
      <i class="iconfont icon-fenxiang" slot="right"></i>
    </top-bar>
    <!-- 唱片封面 -->
    <div class="record-cover">
      <div class="round-cover">

      </div>
    </div>
    <!-- 其他选项 -->
    <div class="other-options">

    </div>
    <!-- 进度条 -->
    <div class="progress-bar">

    </div>
    <!-- 播放控制 -->
    <div class="play-control">

    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";

export default {
  name: "Player",
  components: {
    TopBar,
  }
}
</script>

<style lang="scss" scoped>
$width-cover: 30vh;

#player {
  width: 100%;
  height: 100vh;
  background-color: #ccc;

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
      color: #333334;
      margin: 0 2rem;
    }

    h1 {
      height: 70%;
      font-size: 1.3rem;
    }

    p {
      height: 30%;
      font-size: 0.8rem;
    }
  }

  .record-cover {
    width: 100%;
    height: calc(100vh - 54px - 10vh - 4rem - 15vh);
    position: relative;

    .round-cover {

      width: $width-cover;
      height: $width-cover;
      background-color: rosybrown;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .other-options {
    width: 100%;
    height: 10vh;
    background-color: pink;
  }

  .progress-bar {
    width: 100%;
    height: 4rem;
    background-color: cadetblue;
  }

  .play-control {
    width: 100%;
    height: 15vh;
    background-color: pink;
  }
}
</style>