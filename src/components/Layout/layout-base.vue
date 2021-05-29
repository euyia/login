<template>
  <div
    :class="[name, 'layout-base', {auto: auto, notFlex: notFlex, column: column, scroll: scroll}]"
    :style="{width: width, height: height, minWidth: minWidth, alignItems: align, justifyContent: justify}"
  >
    <slot />
  </div>
</template>

<script>
/**
 * @property    {Boolean}   auto        是否弹性改变大小
 * @property    {Boolean}   notFlex     是否不使用flex布局
 * @property    {String}    width       设置宽度
 * @property    {String}    height      设置高度
 * @property    {String}    align       垂直排列方式
 * 	@value  flex-start      从上往下排列
 * 	@value  center          居中排列
 * 	@value  flex-end        从下往上排列
 * @property    {String}    justify     水平排列方式
 * 	@value  flex-start      从左往右排列
 * 	@value  center          居中排列
 * 	@value  flex-end        从右往左排列
 * 	@value  space-around    两侧的间隔相等
 * 	@value  space-between   左右对齐
 */

export default {
  name: 'LayoutBase',
  props: {
    name: {
      type: String,
      default: ''
    },
    auto: {
      type: Boolean,
      default: false
    },
    column: {
      type: Boolean,
      default: false
    },
    notFlex: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: ''
    },
    justify: {
      type: String,
      default: ''
    },
    scroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.layout-base {
    display: flex;
    overflow: hidden;
    &.auto {
        flex: 1;
    }
    &.column {
        flex-direction: column;
    }
    &.notFlex {
        display: initial;
    }
    &.scroll{
        overflow: auto;
    }
}
</style>

