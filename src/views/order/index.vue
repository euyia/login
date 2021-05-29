<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-20 19:16:59
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">
      <el-input
        v-model="query.name"
        placeholder="姓名"
        clearable
        class="header-item"
      />
      <el-input
        v-model="query.StudentNumber"
        placeholder="学号"
        clearable
        class="header-item"
      />
      <el-input
        v-model="query.Phone"
        placeholder="电话号码"
        clearable
        class="header-item"
      />
      <el-select
        v-model="query.state"
        placeholder="请选择"
        @clear="clearset"
      >
        <el-option
          v-for="item in ordestates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button
        class="header-item-btn"
        type="primary"
        @click="scanClick"
      >搜索</el-button>
    </div>
    <div class="app-full-body">
      <el-table
        v-loading="scanloing"
        :data="tableData"
        highlight-current-row
        size="mini"
        stripe
        @sort-change="onSortChange"
      >
        <el-table-column
          prop="orderNo"
          label="orderNo"
          sortable="custom"
        />

        <el-table-column
          prop="borrowerName"
          label="借书人"
          sortable="custom"
        />

        <el-table-column
          prop="borrowingTime"
          label="借出时间"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{ scope.row.borrowingTime | formatDate }}
          </template>
        </el-table-column>

        <el-table-column
          prop="actReturnTime"
          label="归还时间"
          sortable="custom"
        >
          <template slot-scope="scope">
            {{ scope.row.actReturnTime | formatDate }}
          </template>
        </el-table-column>

        <el-table-column
          prop="状态"
          label="state"
          sortable="custom"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.state ==2 ? 'success' : 'warning'">
              {{ scope.row.state == 2 ? "全部归还" : "未还" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceTag"
          label="书柜"
          sortable="custom"
        />

        <el-table-column
          prop="remark"
          label="备注"
          sortable="custom"
        />

        <el-table-column
          prop="books"
          label="图书/ISBN/NFCID/状态"
          width="520"
          sortable="custom"
        >
          <template slot-scope="scope">
            <el-table
              :data="scope.row.books"
              stripe
              max-height="240"
              size="mini"
              :show-header="false"
              style="width:100%"
            >
              <el-table-column
                prop="name"
                label="书名"
                show-overflow-tooltip
                width="120"
                sortable="custom"
              />
              <el-table-column
                prop="isbn"
                label="isbn"
                width="120"
                sortable="custom"
              />
              <el-table-column
                prop="nfcId"
                label="nfcId"
                width="140"
                sortable="custom"
              />
              <el-table-column
                prop="state"
                label="state"
                width="50"
                sortable="custom"

                filter-placement="bottom-end"
              >
                <template slot-scope="cscope">
                  <el-tag
                    size="mini"
                    :type="cscope.row.state === 1 ? 'success' : 'warning'"
                    disable-transitions
                  >{{ cscope.row.state == 1 ? "已还" : "未还" }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                show-overflow-tooltip
                label="备注"
                width="60"
              />
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link

              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
            >编辑</el-link>
            <el-popconfirm
              v-permission="['Ai.Order.Delete']"
              placement="top"
              title="确定删除此项？"
              @onConfirm="del(scope.row)"
            >
              <el-link
                slot="reference"
                type="danger"
                icon="el-icon-delete"
              >删除</el-link>
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
      :order-id="editOrderId"
      :close-confirm="true"
      dialog-width="50%"
      @close="dialogClose"
    />
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import orderApi from '@/api/order'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/OrderCreateDialog'
import EditDialog from './components/OrderEditDialog'

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      scanloing: false,
      editOrderId: '',
      ordestates: [
        {
          value: '0',
          label: '未还'
        },
        {
          value: '1',
          label: '部分归还'
        },
        {
          value: '2',
          label: '全部归还'
        },
        {
          value: '3',
          label: '全部'
        }
      ],
      query: {
        name: '',
        state: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.scanloing = true
      orderApi.orderList(this.query).then((res) => {
        this.tableData = res.items
        this.updateTotalCount(res.totalCount)
        this.scanloing = false
      })
    },
    scanClick() {
      this.query.skipCount = 0
      this.getList()
    },
    clearset() {
      this.query.state = null
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editOrderId = null
    },
    create() {
      this.createDialogVisible = true
    },
    edit(row) {
      this.editOrderId = row.id
      console.log(row)
      this.editDialogVisible = true
    },
    del(row) {
      orderApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    },
    statecolor(item) {
      console.log(item)
      if (item.state === 0) {
        return { color: 'rgb(' + 128 + ',' + 0 + ',' + 0 + ')' }
      }
      return { color: 'rgb(' + 0 + ',' + 128 + ',' + 0 + ')' }
      //  let R = Math.floor(Math.random() * 130+110);
      //  let G = Math.floor(Math.random() * 130+110);
      //  let B = Math.floor(Math.random() * 130+110);
      //  return {
      //    background: 'rgb(' + R + ',' + G + ',' + B + ')'
      //    };
    }
  }
}
</script>
