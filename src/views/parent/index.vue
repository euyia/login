<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-07 10:41:49
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">
      <el-input
        v-model="query.name"
        placeholder="Name"
        clearable
        class="header-item"
        size="mini"
      />
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
          label="姓名"
          sortable="custom"
        />
        <el-table-column
          prop="email"
          label="邮箱"
          sortable="custom"
        />
        <el-table-column
          prop="phoneNumber"
          label="手机号"
          sortable="custom"
        />
        <el-table-column
          prop="phoneNumberConfirmed"
          label="是否激活"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{ scope.row.phoneNumberConfirmed }}
          </template>
        </el-table-column>
        <el-table-column
          prop="creationTime"
          label="注册时间"
          sortable="custom"
        />
        <!-- <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-link v-permission="['Ai.Parent.Update']" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
            <el-popconfirm v-permission="['Ai.Parent.Delete']" placement="top" title="确定删除此项？" @onConfirm="del(scope.row)">
              <el-link slot="reference" type="danger" icon="el-icon-delete">删除</el-link>
            </el-popconfirm>
          </template>
        </el-table-column> -->
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

  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import parentApi from '@/api/parent'
import Pagination from '@/components/Pagination'

export default {
  name: 'Index',
  components: { Pagination },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      editParentId: '',
      query: {
        name: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      parentApi.getList(this.query).then(res => {
        this.tableData = res.items
        this.updateTotalCount(res.totalCount)
      })
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editParentId = null
    }
  }
}
</script>
