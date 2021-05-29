<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-28 04:45:28
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">
      <el-select
        v-model="schoolset"
        clearable
        placeholder="请选择学校"
        @change="schoolSel"
      >
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button
        class="header-item-btn"
        type="success"
        size="mini"
        @click="create"
      >新增</el-button>
      <el-button
        class="header-item-btn"
        type="success"
        size="mini"
        @click="GetDeviceStatus()"
      >刷新</el-button>
    </div>
    <div class="app-full-body">
      <el-table
        v-loading="bookcaseloading"
        :data="tableData"
        highlight-current-row
        size="mini"
        @sort-change="onSortChange"
      >

        <el-table-column
          prop="deviceId"
          label="设备唯一ID"
          sortable="custom"
        />

        <el-table-column
          prop="deviceTag"
          label="设备标签"
          sortable="custom"
        />

        <el-table-column
          prop="serialnumber"
          label="设备唯一编号"
          sortable="custom"
        />

        <el-table-column
          prop="activation"
          label="激活状态"
          width="100"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.activation === true ? 'success' :'danger' "
              disable-transitions
            >
              {{ formaterActivation(scope.row) }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="caseNum"
          label="格口数量"
          width="100"
          sortable="custom"
        />

        <el-table-column
          prop="version"
          label="信息版本"
          width="100"
          sortable="custom"
        />
        <el-table-column
          prop="appVersion"
          label="APP版本"
          width="100"
          sortable="custom"
        />

        <el-table-column
          prop="school"
          label="所属学校"
          sortable="custom"
        />
        <el-table-column
          prop="devicestatus"
          label="状态"
          width="80"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.devicestatus === 'ONLINE' ? 'success' :'danger'">
              {{ formatdevicestatus(scope.row.devicestatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastOnlineTime"
          label="最后在线时间"
          sortable="custom"
        />

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
            >编辑</el-link>
            <el-popconfirm
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
      :school-list="schoolList"
      dialog-width="50%"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :book-case-id="editBookCaseId"
      :close-confirm="true"
      :school-list="schoolList"
      dialog-width="50%"
      @close="dialogClose"
    />

  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import bookCaseApi from '@/api/bookCase'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/BookCaseCreateDialog'
import EditDialog from './components/BookCaseEditDialog'
import schoolApi from '@/api/school'
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState
} from '@microsoft/signalr'

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      signairStatus: false,
      createDialogVisible: false,
      editDialogVisible: false,
      editBookCaseId: '',
      schoolset: '',
      signalrquit: true,
      schoolList: [],
      devicenames: [],
      devicestatus: [],
      bookcaseloading: true,
      query: {
        schoolId: ''
      }
    }
  },
  created() {
    this.getSchoolList()
    console.log('created')
    this.getList()
  },
  mounted() {
    this.handleStartConnection()
  },
  destroyed: function() {
    this.handleStopConnection()
    console.log('我已经离开了！')
  },
  methods: {
    formatdevicestatus(value) {
      if (value == 'ONLINE') {
        return '在线'
      }
      if (value == 'OFFLINE') {
        return '离线'
      }
      return '未激活'
    },
    formaterActivation(row) {
      if (row.activation) {
        return '激活'
      }
      return '未激活'
    },
    getList() {
      this.bookcaseloading = true
      bookCaseApi.GetBookCaseList(this.query).then((res) => {
        this.tableData = res.items
        this.updateTotalCount(res.totalCount)

        this.devicenames = []
        // console.log(this.devicenames)
        this.bookcaseloading = false
        res.items.forEach((element) => {
          element.devicestatus = ''
          this.devicenames.push(element.deviceId)
        })
        console.log('devinfo')
        console.log(this.tableData)
        this.GetDeviceStatus()
      })
    },
    updateststus(val) {
      console.log('001', val)
      var str = val.status
      var data = []
      this.tableData.forEach((element) => {
        if (element.deviceId == val.deviceName) {
          element.devicestatus = str.toUpperCase()
          data = element
          this.tableData.splice(element.index, data)
        }
      })
    },

    oNdevinfUpdate(date) {
      this.devicestatus = date.result
      console.log('data', date.result)
      this.devicestatus.forEach((element) => {
        //  console.log( this.tableData)
        this.tableData.some((item, i) => {
          if (item.deviceId == element.deviceName) {
            item.devicestatus = element.status
            item.lastOnlineTime = element.lastOnlineTime
            this.tableData.splice(item.index, item)
          }
        })
      })
    },
    GetDeviceStatus() {
      console.log(this.signairStatus)
      if (this.signairStatus) {
        this.connection.invoke('GetDeviceStatus', this.devicenames)
      }
    },
    getSchoolList() {
      var parame = { MaxResultCount: 1000 }
      schoolApi.getList(parame).then((res) => {
        //  console.log(res)
        this.schoolList = Object.assign(this.schoolList, res.items)
        // console.log(this.schoolList)
      })
    },
    dialogClose(refresh) {
      if (refresh) {
        console.log('dialogClose')
        this.getList()
      }
      this.editBookCaseId = null
    },
    create() {
      this.createDialogVisible = true
    },
    edit(row) {
      this.editBookCaseId = row.id
      this.editDialogVisible = true
    },
    del(row) {
      bookCaseApi.delete(row.id).then(() => {
        this.$message('删除成功')
        console.log('del')
        this.getList()
      })
    },
    schoolSel(schoolId) {
      console.log(schoolId)
      this.query.skipCount = 0
      this.query.schoolId = schoolId
      console.log('schoolSel')
      this.getList()
    },
    handleStartConnection() {
      console.log('start signalr connection...')
      if (!this.connection) {
        const builder = new HubConnectionBuilder()
        // const userToken = UserModule.token.replace('Bearer ', '')
        this.connection = builder
          .withUrl(`${process.env.VUE_APP_BASE_API}/signalr-hubs/DeviceManage`)
          .withAutomaticReconnect({ nextRetryDelayInMilliseconds: () => 60000 })
          .build()
        this.connection.on('IotDeviceStatus', (data) =>
          this.oNdevinfUpdate(data)
        )
        this.signairStatus = true
        this.connection.onclose((error) => {
          console.log('signalr connection has closed, error:')
          this.signairStatus = false
          console.log(error)
        })
      }
      if (this.connection.state !== HubConnectionState.Connected) {
        this.connection.start().then(() => {
          this.signairStatus = true
        })
      }
    },

    handleStopConnection() {
      console.log('stop signalr connection...')
      if (
        this.connection &&
        this.connection.state === HubConnectionState.Connected
      ) {
        this.connection.stop()
      }
    }
  }
}
</script>
