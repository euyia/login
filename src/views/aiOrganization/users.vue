<template>
  <div class="app-container">
    <el-row :gutter="0">
      <el-col :span="6">
        <org-tree
          ref="userOrgTree"
          :org-tree-node-click="handleOrgTreeNodeClick"
        />
      </el-col>
      <el-card  class="box-card">
      <el-col :span="24">
        <div class="filter-container">
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            icon="el-icon-refresh"
            @click="handleRefresh"
          >
          </el-button>
          <el-input
            v-model="query.filter"
            placeholder="输入名字查找"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
          </el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-plus"
            @click="handleCreate"
          >
          </el-button>

        </div>
        <el-table
          :data="list"
          :default-sort="{ prop: 'creationTime', order: 'descending' }"
          highlight-current-row
          v-loading="listLoading"
          @sort-change="onSortChange"
        >
          <el-table-column prop="userName" label="用户名" sortable="custom" />
          <el-table-column prop="name" label="姓名" sortable="custom" />
          <el-table-column prop="phoneNumber" label="电话" sortable="custom" />
          <el-table-column
            prop="creationTime"
            label="创建时间"
            sortable="custom"
          >
            <template slot-scope="scope">
              {{ scope.row.creationTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link
                v-permission="['AbpIdentity.Users.Update']"
                type="primary"
                icon="el-icon-edit"
                :underline="false"
                @click="edit(scope.row)"
              />
              <el-link
                v-permission="['AbpIdentity.Users.ManagePermissions']"
                type="primary"
                icon="el-icon-setting"
                :underline="false"
                title="权限"
                @click="menuGrant(scope.row)"
              />
              <el-popconfirm
                v-permission="['AbpIdentity.Users.Delete']"
                placement="top"
                title="确定删除此项？"
                @onConfirm="del(scope.row)"
              >
                <el-link
                  slot="reference"
                  type="danger"
                  :underline="false"
                  icon="el-icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="pagination.totalCount"
          :page.sync="pagination.pageIndex"
          :limit.sync="query.maxResultCount"
          @pagination="onPagination"
        />
      </el-col>
      </el-card>
    </el-row>
     <CreateDialog
      :visible.sync="createDialogVisible"
      :close-confirm="true"
      :roles="allRoles"
      dialog-width="500px"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :user-id="editUserid"
      :close-confirm="true"
      :roles="allRoles"
      dialog-width="700px"
      @close="dialogClose"
    />
    <MenuGrant
      :visible.sync="menuGrantDialogVisible"
      :close-confirm="true"
      :provider-key="menuGrantUserId"
      provider-name="U"
      :name="menuGrantUserName"
      dialog-width="700px"
      @close="dialogClose"
    />

  </div>
</template>
<script>
import listMixin from "@/mixins/listMixin";
import userApi from "@/api/user";
import aiUser from "@/api/aiUser";
import aiOrganizationApi from "@/api/aiOrganization";
import roleApi from "@/api/role";
import MenuGrant from "@/components/MenuGrant";
import Pagination from "@/components/Pagination";
import OrgTree from "./components/org-tree.vue";
import CreateDialog from './components/UserCreateDialog'
import EditDialog from './components/UserEditDialog'
export default {
  name: "Index",
  components: {CreateDialog, EditDialog, OrgTree, MenuGrant, Pagination },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      menuGrantDialogVisible: false,
      editUserid: "",
      menuGrantUserName: "",
      menuGrantUserId: "",
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      singleChecked: false,
      dialogFormVisible: false,
      assignableRoles: null,
      /**
       * 所有角色。
       */
      allRoles: [],

      query: {

        page: 1, limit: 20, sort: undefined, filter: undefined
      }
    };
  },
  created() {
    this.getList();
    this.getRoleAll()
  },
  methods: {
    getList() {
      this.listLoading = true;
      aiOrganizationApi.getUsers(this.query).then(response => {
        this.list = response.items;
        this.updateTotalCount(response.totalCount);
        this.listLoading = false;
      });
    },
     getRoleAll() {
      roleApi.getAll().then(res => {
        this.allRoles = res.items
      })
    },
    menuGrant(row) {
      this.menuGrantUserId = row.id
      this.menuGrantUserName = row.name
      this.menuGrantDialogVisible = true
    },
    edit(row) {
      console.log(row.id)
      this.editUserid = row.id
      this.editDialogVisible = true
    },

    handleCreate() {

      this.editUserid =null
      this.createDialogVisible = true

  //   getAssignableRoles().then(response => {
  //     this.assignableRoles = response.items
  //   })

  //   this.$nextTick(() => {
  //     this.$refs.dialogOrgTree.$refs.orgTree.setCheckedKeys([])
  //     this.$refs['dataForm'].clearValidate()
  //   })
    },

    handleRefresh() {
      this.query.sort=undefined
      this.query.ouId=undefined
      this.query.filter = undefined
      this.getList()
    },

    handleFilter(firstPage = true) {
      if (firstPage) this.query.page = 1;
      this.getList();
    },

    handleOrgTreeNodeClick(data) {
      this.query.ouId = data.id;
      this.handleFilter();
    },
   del(value){
     console.log(value)
   }
  }
};
</script>
