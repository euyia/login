<template>
  <div
    v-loading="loading"
    class="layout-box"
    :style="{width: width, height: height, minWidth: minWidth}"
  >
    <div class="layout-wrap" :style="{padding: getPadding}">
      <div :class="['layout-scroll', {flex: flex}]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutBox',
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    flex: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: String,
      default: ''
    },
    paddingTop: {
      type: String,
      default: '10px'
    },
    paddingLeft: {
      type: String,
      default: '10px'
    },
    paddingRight: {
      type: String,
      default: '10px'
    },
    paddingBottom: {
      type: String,
      default: '10px'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    getPadding() {
      return `${this.paddingTop} ${this.paddingRight} ${this.paddingBottom} ${this.paddingLeft}`
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.layout-box {
    width: 100%;
    height: 100%;
    padding: 3px;
    overflow: hidden;
}
.layout-wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 2px;
}
.layout-scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
    &.flex{
        display: flex;
        flex-direction: column;
    }
}
</style>

