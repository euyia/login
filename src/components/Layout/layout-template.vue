<template>
  <layout-container :height="height" :loading="loading">
    <layout-row>
      <slot name="top" />
    </layout-row>
    <layout-row auto>
      <layout-col>
        <slot name="left" />
      </layout-col>
      <layout-col auto>
        <layout-box padding-bottom="10px">
          <layout-col auto height="100%">
            <layout-col auto>
              <layout-row>
                <layout-col not-flex>
                  <div class="layout-filter">
                    <slot name="button" />
                  </div>
                </layout-col>
                <layout-col ref="layout-filter" auto not-flex>
                  <div class="layout-filter" style="text-align: right;">
                    <template v-if="filterButton">
                      <slot name="filter" />
                    </template>
                    <div class="filter-group">
                      <el-tooltip effect="dark" content="搜索" placement="top">
                        <el-button
                          circle
                          size="mini"
                          icon="el-icon-search"
                          class="button-item"
                          @click="handleSearch"
                        />
                      </el-tooltip>
                    </div>
                  </div>
                </layout-col>
              </layout-row>
              <layout-row auto>
                <slot name="table" />
              </layout-row>
            </layout-col>
            <slot />
          </layout-col>
        </layout-box>
      </layout-col>
      <layout-col>
        <slot name="right" />
      </layout-col>
    </layout-row>
    <layout-row>
      <slot name="bottom" />
    </layout-row>
    <div style="height:0">
      <slot />
    </div>
  </layout-container>
</template>

<script>
export default {
  name: 'LayoutTemplate',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tableColumns: {
      type: Array
    },
    filterModel: {
      type: Object
    },
    filterButton: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleSearch() {
      this.filter.visible = false
      this.$emit('search')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

