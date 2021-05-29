<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-08 14:08:57
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">
      <el-button v-permission="['Ai.School.Create']" class="header-item-btn" type="success" size="mini" @click="create">新增</el-button>
      <el-button class="header-item-btn" type="primary" size="mini" @click="getList">搜索</el-button>
    </div>
    <div class="app-full-body">
      <el-table
        :data="tableData"
        highlight-current-row
        size="mini"
        @sort-change="onSortChange"
      >

        <el-table-column
          prop="name"
          label="名称"
          sortable="custom"
        />

        <el-table-column
          prop="schoolType"
          label="学校类型"
          sortable="custom"
        />

        <el-table-column
          prop="schoolInfo"
          label="学校简介"
          sortable="custom"
        />

        <el-table-column
          prop="areaName"
          label="区域"
        >
          <template slot-scope="scope">
            {{ formatAreaName(scope.row) }}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-link v-permission="['Ai.School.Update']" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
            <el-popconfirm v-permission="['Ai.School.Delete']" placement="top" title="确定删除此项？" @onConfirm="del(scope.row)">
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
      :school-id="editSchoolId"
      :close-confirm="true"
      dialog-width="50%"
      @close="dialogClose"
    />

  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import schoolApi from '@/api/school'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/SchoolCreateDialog'
import EditDialog from './components/SchoolEditDialog'

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      editSchoolId: '',
      query: {

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    formatAreaName(row) {
      return row.provinceName + ',' + row.cityName + ',' + row.areaName
    },
    getList() {
      schoolApi.getList(this.query).then(res => {
        this.tableData = res.items
        this.updateTotalCount(res.totalCount)
      })
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editSchoolId = null
    },
    create() {
      this.createDialogVisible = true
    },
    edit(row) {
      this.editSchoolId = row.id
      this.editDialogVisible = true
    },
    del(row) {
      schoolApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    }
  }
}
</script>
