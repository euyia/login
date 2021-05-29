<template>
  <div
    v-loading="loading"
    class="layout-container"
    :style="{width, height}"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.4)"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LayoutContainer',
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    loading: {
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
.layout-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 3px;
    background: #e9eef2;
    overflow: hidden;
}
</style>

