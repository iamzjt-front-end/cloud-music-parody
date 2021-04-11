<template>
  <div id="marquee-wrap" ref="marquee-wrap">
    <p class="marquee">{{ text }}</p>
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
  methods: {
    move() {

    }
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        if (newVal != oldVal) {
          clearInterval(this.timer)
          for (let item of this.value) {
            this.text += item
          }
          let timer = setTimeout(() => {
            this.move()
            clearTimeout(timer)
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
