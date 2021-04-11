<template>
  <div id="marquee-wrap" ref="marqueeWrap">
    <div class="scroll" ref="scroll">
      <p class="marquee" ref="marquee">{{ text }}</p>
      <p class="copy" ref="copy"></p>
    </div>
    <p class="getWidth" ref="getWidth">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'marquee',
  props: ['value'],
  data() {
    return {
      text: '',
      timer: null
    }
  },
  methods: {
    move() {
      let wrapWidth = this.$refs.marqueeWrap.offsetWidth; // 容器宽度
      let textWidth = this.$refs.getWidth.scrollWidth; // 实际内容宽度
      let scrollWidth = textWidth + 40;
      if (textWidth >= wrapWidth) {
        let copy = this.$refs.copy;
        copy.innerText = this.text;
        copy.style.marginLeft = '40px';

        let distance = 0;
        this.timer = setInterval(() => {
          distance++;
          if (distance > scrollWidth) {
            distance = 1;
            // todo 优化  回到原处可以停顿个半秒，然后再继续移动
          }
          this.$refs.scroll.style.transform = `translateX(${-distance}px)`;
        }, 35)
      }
    }
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        if (newVal != oldVal) {
          clearInterval(this.timer);
          this.text = this.value;
          let timer = setTimeout(() => {
            this.move();
            clearTimeout(timer);
          }, 1000)
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#marquee-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  p {
    white-space: nowrap;
  }

  .scroll {
    p {
      display: inline;
    }
  }

  .getWidth {
    white-space: nowrap;
    position: absolute;
    opacity: 0;
    top: 0;
  }
}
</style>
