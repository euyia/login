<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      size="mini"
      @sort-change="onSortChange"
    >
      <el-table-column
        prop="lastTime"
        label="lastTime"
        sortable="custom"
      />
      <el-table-column
        prop="utcLastTime"
        label="utcLastTime"
        sortable="custom"
      />
      <el-table-column
        prop="clientIp"
        label="clientIp"
        sortable="custom"
      />
      <el-table-column
        prop="utcTime"
        label="utcTime"
        sortable="custom"
      />
      <el-table-column
        prop="time"
        label="time"
        sortable="custom"
      />
      <el-table-column
        prop="status"
        label="status"
        sortable="custom"
      />
    </el-table>

    <div>
      <pagination
        :total="totalCount"
        :page.sync="pagination.pageIndex"
        :limit.sync="query.maxResultCount"
        @pagination="onPagination"
      />
    </div>
  </div>
</template>
<script>
import listMixin from '@/mixins/listMixin'
import bookCaseApi from '@/api/bookCase'
import Pagination from '@/components/Pagination'
export default {
  name: 'DeviceStatusRecord',
  components: {
    Pagination
  },
  mixins: [listMixin],
  props: {
    deviceid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: [],
      totalCount: 0,
      loading: false,
      query: {
        skipCount: 0
      }
    }
  },
  watch: {
    deviceid: {
      immediate: true,
      handler: function() {
        console.log('222', this.deviceid)
        this.getList()
      }
    }
  },
  created() {
    console.log('000')
    this.getList()
  },
  methods: {
    getList() {
      console.log('333', this.query)
      if (this.deviceid) {
        this.loading = true
        bookCaseApi
          .deviceStatusRecord(this.deviceid, this.query)
          .then((result) => {
            this.tableData = result.items
            this.loading = false
            this.totalCount = result.totalCount
            console.log('444', this.query)
          })
      }
    }
  }
}
</script>
