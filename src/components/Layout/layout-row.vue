<template>
  <layout-base
    name="layout-row"
    :auto="auto"
    :column="column"
    :not-flex="notFlex"
    :width="width"
    :height="height"
    :min-width="minWidth"
    :scroll="scroll"
    :align="align"
    :justify="justify"
  >
    <slot />
  </layout-base>
</template>

<script>
import layoutBase from './layout-base'
export default {
  name: 'LayoutRow',
  components: { layoutBase },
  props: {
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
    scroll: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: ''
    },
    justify: {
      type: String,
      default: ''
    }
  }
}
</script>

