<template>
  <div class="marquee-wrap" ref="marquee-wrap">
    <div class="scroll" ref="scroll">
      <p class="marquee">{{ text }}</p>
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
      timer: null,
      text: ''
    }
  },
  created() {
    let timer = setTimeout(() => {
      this.move()
      clearTimeout(timer)
    }, 1000)
  },
  mounted() {
    for (let item of this.value) {
      this.text += item
    }
  },
  methods: {
    move() {
      let maxWidth = this.$refs['marquee-wrap'].clientWidth
      let width = this.$refs['getWidth'].scrollWidth
      if (width <= maxWidth) return
      let scroll = this.$refs['scroll']
      let copy = this.$refs['copy']
      copy.innerText = this.text
      let distance = 0
      this.timer = setInterval(() => {
        distance -= 1
        if (-distance >= width) {
          distance = 16
        }
        scroll.style.transform = 'translateX(' + distance + 'px)'
      }, 20)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.marquee-wrap {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee {
  margin-right: 0.16rem;
}

p {
  word-break: keep-all;
  white-space: nowrap;
  font-size: 1.2rem;
}

.scroll {
  display: flex;
}

.getWidth {
  word-break: keep-all;
  white-space: nowrap;
  position: absolute;
  opacity: 0;
  top: 0;
}
</style>
