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
        prop="serialnumber"
        label="终端编号"
        sortable="custom"
      />
      <el-table-column
        prop="serverDateTime"
        label="添加时间"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.serverDateTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="dateTime"
        label="时间"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.dateTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="off"
        label="off"
        sortable="custom"
      />
      <el-table-column
        prop="on"
        label="on"
        sortable="custom"
      />

    </el-table>

    <div>
      <pagination
        :total="pagination.totalCount"
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
  name: 'Powerlog',
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
      loading: false,
      query: {}
    }
  },
  watch: {
    deviceid: {
      immediate: true,
      handler: function() {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.deviceid) {
        this.loading = true
        bookCaseApi.powerLog(this.deviceid, this.query).then((result) => {
          this.tableData = result.items
          this.loading = false
        })
      }
    }
  }
}
</script>
