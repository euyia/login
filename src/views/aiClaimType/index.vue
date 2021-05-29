<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-27 02:05:20
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">


      <el-input
        v-model="query.filter"
        placeholder="Filter"
        clearable
        class="header-item"
        size="mini"
      />
      <el-button class="header-item-btn" type="primary" size="mini" @click="getList">搜索</el-button>
      <el-button  v-permission="['AbpIdentity.ClaimTypes.Create']" class="header-item-btn" type="success" size="mini" @click="create">新增</el-button>
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
          label="name"
          sortable="custom"
        />

        <el-table-column
          prop="required"
          label="required"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.required }}
          </template>
        </el-table-column>


        <el-table-column
          prop="isStatic"
          label="isStatic"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.isStatic }}
          </template>
        </el-table-column>


        <el-table-column
          prop="regex"
          label="regex"
          sortable="custom"
        />

        <el-table-column
          prop="regexDescription"
          label="regexDescription"
          sortable="custom"
        />

        <el-table-column
          prop="description"
          label="description"
          sortable="custom"
        />

        <el-table-column
          prop="valueType"
          label="valueType"
          sortable="custom"
        />

        <el-table-column
          prop="valueTypeAsString"
          label="valueTypeAsString"
          sortable="custom"
        />

        <el-table-column
          prop="id"
          label="id"
          sortable="custom"
        />

        <el-table-column
          prop="extraProperties"
          label="extraProperties"
          sortable="custom"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-link  v-permission="['AbpIdentity.ClaimTypes.Update']" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
            <el-popconfirm  v-permission="['AbpIdentity.ClaimTypes.Delete']" placement="top" title="确定删除此项？" @onConfirm="del(scope.row)">
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
      :aiClaimTypeId="editAiClaimTypeId"
      :close-confirm="true"
      dialog-width="50%"
      @close="dialogClose"
    />

  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import aiClaimTypeApi from '@/api/aiClaimType'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/AiClaimTypeCreateDialog'
import EditDialog from './components/AiClaimTypeEditDialog'

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      editAiClaimTypeId: '',
      query: {

        filter: '',
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      aiClaimTypeApi.getList(this.query).then(res => {
        this.tableData = res.items
        this.updateTotalCount(res.totalCount)
      })
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editAiClaimTypeId = null
    },
    create() {
      this.createDialogVisible = true
    },
    edit(row) {
      this.editAiClaimTypeId = row.id
      this.editDialogVisible = true
    },
    del(row) {
      aiClaimTypeApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    }
  }
}
</script>
