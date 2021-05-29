<!--
* @description Created by AbpVueCli
* @author zhaokun
* @date 2020-04-20 15:23:55
* @version V1.0.0
!-->
<template>
 <div class="app-container">
   <el-row :gutter="0">
      <el-col :span="6">
        <org-tree
          ref="roleOrgTree"
          :org-tree-node-click="handleOrgTreeNodeClick"
        />
      </el-col>
      <el-col :span="18">
    <div class="filter-container">
      <el-button
        v-permission="['AbpIdentity.Roles.Create']"
        class="header-item-btn"
        type="success"
        size="mini"
        @click="create"
      >新增</el-button>
      <el-button
            class="filter-item"
            style="margin-left: 10px;"
            icon="el-icon-refresh"
            @click="handleRefresh"
          >
           复位
          </el-button>
    </div>
    <div class="filter-container">
      <el-table
        :data="tableData"
        highlight-current-row
        size="small"
        v-loading="listLoading"
        @sort-change="onSortChange"
      >

        <el-table-column
          prop="name"
          label="名称"
          sortable="custom"
        />

        <el-table-column
          prop="isDefault"
          label="是否默认"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{ scope.row.isDefault | formatBoolean }}
          </template>
        </el-table-column>

        <el-table-column
          prop="isPublic"
          label="是否公开"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{ scope.row.isPublic | formatBoolean }}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-link
              v-permission="['AbpIdentity.Roles.Update']"
              type="primary"
              icon="el-icon-edit"
              :underline="false"
              @click="edit(scope.row)"
            />
            <el-link
              v-permission="['AbpIdentity.Roles.ManagePermissions']"
              type="primary"
              icon="el-icon-setting"
              :underline="false"
              @click="permissionGrant(scope.row)"
            />
            <el-popconfirm
              v-if="!scope.row.isStatic"
              v-permission="['AbpIdentity.Roles.Delete']"
              placement="top"
              title="确定删除此项？"
              @onConfirm="del(scope.row)"
            >
              <el-link slot="reference" type="danger" :underline="false" icon="el-icon-delete" />
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
      :orgId="orgId"
      dialog-width="500px"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :role-id="editRoleId"
      :orgId="orgId"
      :close-confirm="true"
      dialog-width="500px"
      @close="dialogClose"
    />
    <MenuGrant
      :visible.sync="permissionGrantDialogVisible"
      :close-confirm="true"
      :provider-key="permissionGrantProviderKey"
      provider-name="R"
      :name="permissionGrantName"
      dialog-width="700px"
      @close="dialogClose"
    />
     </el-col>
    </el-row>
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import roleApi from '@/api/role'
import aiOrganizationApi from '@/api/aiOrganization'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/RoleCreateDialog'
import EditDialog from './components/RoleEditDialog'
import MenuGrant from '@/components/MenuGrant'
import OrgTree from './components/org-tree'
import aiRole from '@/api/aiRole'

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination, MenuGrant,OrgTree },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      listLoading: true,
      permissionGrantDialogVisible: false,
      editRoleId: '',
      orgId:'',
      permissionGrantName: '',
      permissionGrantProviderKey: '',
       listQuery: { page: 1, limit: 20, sort: undefined, filter: undefined },
      query: {

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading=true;
      aiOrganizationApi.getRoles(this.listQuery).then(res => {
        this.tableData = res.items
        this.updateTotalCount(res.totalCount)
        this.listLoading=false
      })
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
     handleRefresh() {
      this.listQuery.ouId = undefined
      this.$refs.roleOrgTree.$refs.orgTree.setCurrentKey(null)
      this.orgData = null
      this.handleFilter()
    },
    sortChange(data) {
      const { prop, order } = data
      this.listQuery.sort = order ? `${prop} ${order}` : undefined
      this.handleFilter()
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editRoleId = null
    },
    create() {
      if ( this.orgData===null){

      }
      this.createDialogVisible = true
    },
    edit(row) {
      this.editRoleId = row.id
      this.editDialogVisible = true
    },
    del(row) {
      roleApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    },
    permissionGrant(row) {
      this.permissionGrantProviderKey = row.name
      this.permissionGrantName = row.name
      this.permissionGrantDialogVisible = true
    },
    handleOrgTreeNodeClick(data) {
      console.log(data)
      if (data.id) {
        this.listQuery.ouId = data.id
        this.orgData = data
        this.orgId=data.id
        this.handleFilter()
      }
    }
  }
}
</script>
