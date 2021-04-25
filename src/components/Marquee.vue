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
        this.$refs.copy.innerText = this.text;
        this.$refs.copy.style.marginLeft = '40px';
        this.$refs.scroll.style.justifyContent = '';

        let distance = 0;
        setTimeout(() => {
          this.timer = setInterval(() => {
            distance++;
            if (distance > scrollWidth) {
              distance = 1;
            }
            this.$refs.scroll.style.transform = `translateX(${-distance}px)`;
          }, 35)
        }, 1200)
      } else {
        this.$refs.scroll.style.justifyContent = 'center';
      }
    }
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        if (newVal != oldVal) {
          clearInterval(this.timer);

          let copy = this.$refs.copy;
          copy.innerText = '';
          copy.style.marginLeft = '0';
          let scroll = this.$refs.scroll;
          scroll.style.transform = 'translateX(0)';

          this.text = this.value;
          let timer1 = setTimeout(() => {
            this.move();
            clearTimeout(timer1);
          })
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
    display: flex;
  }

  .getWidth {
    position: absolute;
    opacity: 0;
    top: 0;
  }
}
</style>
