<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 13:04:18
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">

      <el-button class="header-item-btn" type="success" size="mini" @click="create">新增</el-button>
    </div>
    <div class="app-full-body">
      <el-table
        :data="tableData"
        highlight-current-row
        size="mini"
        @sort-change="onSortChange"
      >

        <el-table-column
          prop="title"
          label="title"
          sortable="custom"
          show-overflow-tooltip
        />

        <el-table-column
          prop="pic"
          label="pic"
          sortable="custom"
          show-overflow-tooltip
        />

        <el-table-column
          prop="author"
          label="author"
          sortable="custom"
          show-overflow-tooltip
        />

        <el-table-column
          prop="summary"
          label="summary"
          sortable="custom"
          show-overflow-tooltip
        />

        <el-table-column
          prop="isbn"
          label="isbn"
          sortable="custom"
          show-overflow-tooltip
        />

        <el-table-column
          prop="types"
          label="types"
          sortable="custom"
          show-overflow-tooltip
        />

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-link type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
            <el-popconfirm placement="top" title="确定删除此项？" @onConfirm="del(scope.row)">
              <el-link slot="reference" type="danger" icon="el-icon-delete">删除</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="app-full-footer">
      <pagination
        :total="pagination.totalCount"
        :page.sync="pagination.pageIndex"
        :limit.sync="query.maxResultCount"
        @pagination="onPagination"
      />
    </div>
    <CreateDialog
      :visible.sync="createDialogVisible"
      :close-confirm="true"
      :book-type="bookType"
      dialog-width="60%"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :book-id="editBookId"
      :book-type="bookType"
      :close-confirm="true"
      dialog-width="60%"
      @close="dialogClose"
    />

  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import bookApi from '@/api/book'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/BookCreateDialog'
import EditDialog from './components/BookEditDialog'

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      editBookId: '',
      bookType: [],
      query: {

      }
    }
  },
  created() {
    this.getBooktype()
    this.getList()
    // bookApi.getBookTypeList()
  },
  methods: {
    getBooktype() {
      bookApi.getBookTypeList().then(res => {
        this.bookType = Object.assign(this.bookType, res)
      })
    },
    getList() {
      bookApi.getList(this.query).then(res => {
        this.tableData = res.items
        this.updateTotalCount(res.totalCount)
      })
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editBookId = null
    },
    create() {
      this.createDialogVisible = true
    },
    edit(row) {
      console.log(this.bookType)
      this.editBookId = row.id
      this.editDialogVisible = true
    },
    del(row) {
      bookApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    }
  }
}
</script>
