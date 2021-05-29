<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-26 21:57:18
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">
      <el-input
        v-model="query.parentId"
        placeholder="ParentId"
        clearable
        class="header-item"
        size="mini"
      />
      <el-input
        v-model="query.filter"
        placeholder="Filter"
        clearable
        class="header-item"
        size="mini"
      />
      <el-button class="header-item-btn" type="primary" size="mini" @click="getList">搜索</el-button>
      <el-button v-permission="['AbpIdentity.OrganitaionUnits.Create']" class="header-item-btn" type="success" size="mini" @click="create">新增</el-button>
    </div>
    <div class="app-full-body">
      <el-table
        :data="tableData"
        v-loading = "tabload"
        :load = "loadChildren"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        highlight-current-row
        size="mini"
        row-key="id"
        border
        fit
        lazy
        @sort-change="onSortChange"
      >
        <el-table-column
          prop="code"
          label="code"
          sortable="custom"
        />

        <el-table-column
          prop="displayName"
          label="displayName"
          sortable="custom"
        />

        <el-table-column
          prop="level"
          label="level"
          sortable="custom"
        />

        <el-table-column
          prop="isLeaf"
          label="isLeaf"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.isLeaf }}
          </template>
        </el-table-column>
        <el-table-column
          prop="children"
          label="children"
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
            <el-button  v-permission="['AbpIdentity.OrganitaionUnits.Update']" type="primary" icon="el-icon-edit" circle size="mini" @click="edit(scope.row)"></el-button>
             <el-button  v-permission="['AbpIdentity.OrganitaionUnits.Create']" type="primary" icon="el-icon-plus" circle  size="mini" @click="create(scope.row)"></el-button>
             <el-popconfirm  v-permission="['AbpIdentity.OrganitaionUnits.Delete']" placement="top" title="确定删除此项？" @onConfirm="del(scope.row)">
             <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" circle  ></el-button>
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
      :createAiOrganizationId="createAiOrganizationId"
      dialog-width="50%"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :aiOrganizationId="editAiOrganizationId"
      :close-confirm="true"
      dialog-width="50%"
      @close="dialogClose"
    />
  </div>
</template>
<script>
import listMixin from '@/mixins/listMixin'
import aiOrganizationApi from '@/api/aiOrganization'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/AiOrganizationCreateDialog'
import EditDialog from './components/AiOrganizationEditDialog'

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      tabload:false,
      createDialogVisible: false,
      editDialogVisible: false,
      createAiOrganizationId:'',
      editAiOrganizationId: '',
      query: {
        parentId: '',
        filter: '',
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.tabload=true
      aiOrganizationApi.getRoot(this.query).then(res => {
        this.tableData =this.processingChildrenLeaf(res.items)
        this.updateTotalCount(res.totalCount)
        this.tabload=false
      })
    },
    loadChildren(row, treeNode, resolve) {
      aiOrganizationApi.getChildren(row.id).then(response => {
        resolve(this.processingChildrenLeaf(response))
      })
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editAiOrganizationId = null
    },
    create(value) {
      this.createAiOrganizationId=value.id
      console.log(this.createAiOrganizationId);
      this.createDialogVisible = true
    },
    edit(row) {
      this.editAiOrganizationId = row.id
      this.editDialogVisible = true
    },
    del(row) {
      aiOrganizationApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    },
    processingChildrenLeaf(response) {
      // 统一处理返回值
      return response.map(item => {
        if (item.children) {
          item.children = []
        }
        item.hasChildren = !item.isLeaf
        return item
      })
    }
  }
}
</script>
