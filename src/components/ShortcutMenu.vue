<template>
  <div class="shortcut-menu">
    <shortcut-menu-item v-for="(item, index) in titleList" :key="index">
      <i class="iconfont" :class="item.className" slot="icon"></i>
      <p slot="title">{{ item.title }}</p>
    </shortcut-menu-item>
  </div>
</template>

<script>
import ShortcutMenuItem from "@/components/ShortcutMenuItem";

export default {
  name: "ShortcutMenu",
  components: {
    ShortcutMenuItem,
  },
  data() {
    return {
      titleList: [
        {
          className: 'icon-recommend',
          title: '每日推荐'
        }, {
          className: 'icon-privateFM',
          title: '私人FM'
        }, {
          className: 'icon-songlist',
          title: '歌单'
        }, {
          className: 'icon-charts',
          title: '排行榜'
        }, {
          className: 'icon-album',
          title: '专辑'
        }
      ]
      // titleList: ['每日推荐','私人FM', '歌单', '排行榜', '直播', '专辑', '游戏']
      // todo 增加快捷菜单 并 可左右滑动拓展
    }
  },
}
</script>

<style lang="scss" scoped>
.shortcut-menu {
  display: flex;

  .shortcut-menu-item {
    flex: 1;
  }
}
</style>