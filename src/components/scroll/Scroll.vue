<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    setTimeout(() => { // 确保DOM渲染完毕
      this.initScroll()
      console.log('this.scroll', this.scroll);
    }, 2000)
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BetterScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          if (!this.scroll) {
            let that = this;
            this.$nextTick(() => {
              that.initScroll();
            })
          } else {
            this.refresh()
          }
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>