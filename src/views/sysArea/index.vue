<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-05 21:02:19
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">

      <el-button v-permission="['Ai.SysArea.Create']" class="header-item-btn" type="success" size="mini" @click="create">新增</el-button>
    </div>
    <div class="app-full-body">
      <el-table
        :data="tableData"
        highlight-current-row
        size="mini"
        @sort-change="onSortChange"
      >
        <el-table-column
          prop="code"
          label="编码"
          sortable="custom"
        />
        <el-table-column
          prop="name"
          label="名称"
          sortable="custom"
        />
        <el-table-column
          prop="desc"
          label="描述"
          sortable="custom"
        />
        <el-table-column
          prop="type"
          label="类型"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          sortable="custom"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-link v-permission="['Ai.SysArea.Update']" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
            <el-popconfirm v-permission="['Ai.SysArea.Delete']" placement="top" title="确定删除此项？" @onConfirm="del(scope.row)">
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
      dialog-width="50%"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :sys-area-id="editSysAreaId"
      :close-confirm="true"
      dialog-width="50%"
      @close="dialogClose"
    />

  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import sysAreaApi from '@/api/sysArea'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/SysAreaCreateDialog'
import EditDialog from './components/SysAreaEditDialog'
import { sysAreaTypeEnum } from './components/SysAreaConfig'

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      sysAreaTypeEnum,
      createDialogVisible: false,
      editDialogVisible: false,
      editSysAreaId: '',
      query: {

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      sysAreaApi.getList(this.query).then(res => {
        this.tableData = res.items
        this.updateTotalCount(res.totalCount)
      })
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editSysAreaId = null
    },
    create() {
      this.createDialogVisible = true
    },
    edit(row) {
      this.editSysAreaId = row.id
      this.editDialogVisible = true
    },
    del(row) {
      sysAreaApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    }
  }
}
</script>
