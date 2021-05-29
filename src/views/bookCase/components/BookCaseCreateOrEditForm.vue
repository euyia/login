<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-28 04:45:27
* @version V1.0.0
!-->
<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
  >
    <el-tab-pane
      label="设备基本信息"
      name="bookcaseinfo"
    >
      <section>
        <el-form
          ref="from"
          :model="formData"
          :rules="rules"
          label-width="120px"
          label-position="right"
          size="mini"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                prop="deviceId"
                label="deviceId"
              >
                <el-input
                  v-model="formData.deviceId"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="deviceTag"
                label="deviceTag"
              >
                <el-input
                  v-model="formData.deviceTag"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="serialnumber"
                label="设备唯一编号"
              >
                <el-input
                  v-model="formData.serialnumber"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="activation"
                :disabled="true"
                label="设备使用状态："
              >
                <el-switch v-model="formData.activation" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="caseNum"
                label="格口数量"
              >
                <el-input
                  v-model="formData.caseNum"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="nfcSerialPort"
                label="NFC串口号"
              >
                <el-input
                  v-model="formData.nfcSerialPort"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="caseBaudRate"
                label="控制板波特率"
              >
                <el-input
                  v-model="formData.caseBaudRate"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="nfcSerialBaudRate"
                label="NFC串口波特率"
              >
                <el-input
                  v-model="formData.nfcSerialBaudRate"
                  class="form-item"
                  size="mini"
                  :disabled="true"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="caseSerialPort"
                label="控制板串口号"
              >
                <el-input
                  v-model="formData.caseSerialPort"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="rfidSeriaPort"
                label="rfidSeriaPort"
              >
                <el-input
                  v-model="formData.rfidSeriaPort"
                  :disabled="true"
                  class="form-item"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                prop="lampProt"
                label="照明灯端口"
              >
                <el-input
                  v-model="formData.lampProt"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="uvSwTimes"
                label="Uv灯开关时间"
              >
                <el-input
                  v-model="formData.uvSwTimes"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="powerTimes"
                label="开关机时间"
              >
                <el-input
                  v-model="formData.powerTimes"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="simlarThreshold"
                label="人脸比对相似度"
              >
                <el-input
                  v-model="formData.simlarThreshold"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="baiduTtsSn"
                label="百度TTS序列号"
              >
                <el-input
                  v-model="formData.baiduTtsSn"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="address"
                label="设备所在地址"
              >
                <el-input
                  v-model="formData.address"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="version"
                label="设备信息版本"
              >
                <el-input
                  v-model="formData.version"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="appVersion"
                label="设备APP版本"
              >
                <el-input
                  v-model="formData.appVersion"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="firmwareVersion"
                label="主板固件版本"
              >
                <el-input
                  v-model="formData.firmwareVersion"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="schoolId"
                label="所属学校"
              >
                <el-select
                  v-model="schoolset"
                  placeholder="请选择"
                  :disabled="true"
                  size="mini"
                  @change="schoolSel"
                >
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="schoolId"
                label="学校ID"
              >
                <el-input
                  v-model="formData.schoolId"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            </el-col></el-row>
        </el-form>

      </section>
    </el-tab-pane>
    <el-tab-pane
      label="设备设置"
      name="bookcaseseup"
    >
      <section>
        <el-form
          ref="from"
          :model="formData"
          :rules="rules"
          label-width="120px"
          label-position="right"
          size="mini"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                prop="deviceTag"
                label="deviceTag"
              >
                <el-input
                  v-model="formData.deviceTag"
                  class="form-item"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="serialnumber"
                label="设备唯一编号"
              >
                <el-input
                  v-model="formData.serialnumber"
                  class="form-item"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="activation"
                label="设备使用状态："
              >
                <el-switch v-model="formData.activation" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                prop="simlarThreshold"
                label="人脸比对相似度"
              >
                <el-input
                  v-model="formData.simlarThreshold"
                  class="form-item"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="baiduTtsSn"
                label="百度TTS序列号"
              >
                <el-input
                  v-model="formData.baiduTtsSn"
                  class="form-item"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="address"
                label="address"
              >
                <el-input
                  v-model="formData.address"
                  class="form-item"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item

                label="消毒灯开关时间"
              >
                <template>
                  <el-time-select
                    v-model="uvTime.on"
                    placeholder="开机时间"
                    :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00'
                    }"
                  />
                  <el-time-select
                    v-model="uvTime.off"
                    placeholder="关机时间"
                    :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                      offminTime: uvTime.on
                    }"
                  /></template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item

                label="开关机时间"
              >
                <template>
                  <el-time-select
                    v-model="powerTime.on"
                    placeholder="开机时间"
                    :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00'
                    }"
                  />
                  <el-time-select
                    v-model="powerTime.off"
                    placeholder="关机时间"
                    :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                      offminTime: powerTime.on
                    }"
                  /></template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="adminName"
                label="管理员"
              >
                <el-input
                  v-model="formData.adminName"
                  class="form-item"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="adminPassWord"
                label="管理员密码"
              >
                <el-input
                  v-model="formData.adminPassWord"
                  class="form-item"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="version"
                label="设备信息版本"
              >
                <el-input
                  v-model="formData.version"
                  class="form-item"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="schoolId"
                label="所属学校"
              >
                <el-select
                  v-model="schoolset"
                  placeholder="请选择"
                  size="mini"
                  @change="schoolSel"
                >
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
        <div class="from-footer">
          <el-button
            size="mini"
            @click="cancel"
          >取消</el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="submitBt"
            :loading="submitBt"
            @click="savesetup"
          >提交</el-button>
        </div>
      </section>
    </el-tab-pane>
    <el-tab-pane
      label="书柜格子信息"
      name="caseinfo"
    >
      <el-table
        :data="formData.caseInfos"
        highlight-current-row
        size="mini"
      >
        <el-table-column
          prop="id"
          label="id"
          sortable="custom"
        />
        <el-table-column
          prop="openNum"
          label="openNum"
          sortable="custom"
        />
        <el-table-column
          prop="restNum"
          label="restNum"
          sortable="custom"
        />
        <el-table-column
          prop="caseUid"
          label="caseUid"
          sortable="custom"
        />
        <el-table-column
          prop="restRfidNum"
          label="restRfidNum"
          sortable="custom"
        />
      </el-table>
    </el-tab-pane>

    <el-tab-pane
      label="控制板信息"
      name="deviceinfo"
    >
      <el-table
        :data="formData.deviceInfos"
        highlight-current-row
        size="mini"
      >
        <el-table-column
          prop="id"
          label="id"
          sortable="custom"
        />
        <el-table-column
          prop="caseNum"
          label="caseNum"
          sortable="custom"
        />
        <el-table-column
          prop="caseType"
          label="caseType"
          sortable="custom"
        />
        <el-table-column
          prop="caseUid"
          label="caseUid"
          sortable="custom"
        />
      </el-table>
    </el-tab-pane>
    <el-tab-pane
      label="书籍信息"
      name="bookinfo"
    >
      <el-table :data="formData.caseInfos">
        <el-table-column
          prop="openNum"
          label="格口号"
          width="80"
        />
        <el-table-column
          prop="books"
          label="书"
        >
          <template slot-scope="scope">
            <el-table
              :data="scope.row.books"
              stripe
              size="mini"
              :show-header="false"
              style="width:100%"
            >
              <el-table-column
                prop="bookName"
                label="书名"
                show-overflow-tooltip
                sortable="custom"
              />
              <el-table-column
                prop="id"
                label="NfcId"
                show-overflow-tooltip
                sortable="custom"
              />
              <el-table-column
                prop="state"
                label="状态"
                show-overflow-tooltip
                width="120"
                sortable="custom"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.state === 2 ? 'danger' : 'success'"
                    disable-transitions
                  >{{ scope.row.state === 2 ? '已借出' : '在书柜' }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>

    </el-tab-pane>

    <el-tab-pane
      label="人员信息"
      name="usersinfo"
    >
      <div class="app-full-body">
        <div>
          <el-table
            v-loading="usersloading"
            :data="usertableData"
            :stripe="true"
            :default-sort="{ prop: 'creationTime', order: 'descending' }"
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
              prop="studentNumber"
              label="学号"
              sortable="custom"
            />
            <el-table-column
              prop="phoneNumber"
              label="手机号"
              sortable="custom"
            />
            <el-table-column
              prop="userType"
              label="用户类型"
              sortable="custom"
            />
            <el-table-column label="头像">
              <template slot-scope="scope">
                <img
                  :src="scope.row.imageUrl"
                  width="40"
                  height="40"
                  class="head_pic"
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <pagination
            :total="pagination.totalCount"
            :page.sync="pagination.pageIndex"
            :limit.sync="query.maxResultCount"
            @pagination="onPagination"
          />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane
      label="书柜控制"
      name="bookcasecontrol"
    >
      <el-col :span="24">
        <el-form
          :inline="true"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-col :span="11">
            <el-form-item label="格子开关">
              <el-select
                v-model="setcase"
                size="mini"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in formData.caseInfos"
                  :key="item.index"
                  :label="item.openNum"
                  :value="item.openNum"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                size="mini"
                @click="opencase"
              >发送</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="照明灯开关" />
            <el-form-item>
              <el-switch
                v-model="LedSW"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开"
                inactive-text="关"
                @change="ledsw"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="UV开关" />
            <el-form-item>
              <el-switch
                v-model="UvSw"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开"
                inactive-text="关"
                @change="uvsw"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="系统重启" />
            <el-form-item>
              <el-button
                type="success"
                size="medium"
                @click="Reboot"
              >重启</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="App重启" />
            <el-form-item>
              <el-button
                type="success"
                size="medium"
                @click="AppReboot"
              >重启</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-tab-pane>
    <el-tab-pane
      label="设备在线信息"
      name="devicestatus"
    >
      <DeviceStatusRecord :deviceid="deviceid" />
    </el-tab-pane>
    <el-tab-pane
      label="设备开关机信息"
      name="powerlog"
    >
      <Powerlog :deviceid="deviceid" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import fromMixin from '@/mixins/formMixin'
import listMixin from '@/mixins/listMixin'
import bookCaseApi from '@/api/bookCase'
import DeviceStatusRecord from './DeviceStatusRecord.vue'
import { viewModel, rules } from './BookCaseConfig'
import schoolApi from '../../../api/school/schoolApi'
// Powerlog
import Powerlog from './Powerlog.vue'
import Pagination from '@/components/Pagination'

export default {
  name: 'BookCaseCreateOrEditForm',
  components: {
    Pagination,
    Powerlog,
    DeviceStatusRecord
  },
  mixins: [fromMixin, listMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    bookCaseId: {
      type: String,
      default: ''
    },
    schoolList: Array
  },
  data() {
    return {
      formData: Object.assign({}, viewModel),
      activeName: 'bookcaseinfo',
      schoolset: '',
      LedSW: false,
      UvSw: false,
      submitBt: false,
      uvTime: { on: '08:00', off: '18:00' },
      powerTime: { on: '08:00', off: '18:00' },
      deviceid: '',
      rules,
      usersloading: true,
      query: {
        SchoolId: '',
        maxResultCount: 10
      },
      statusquery: {
        maxResultCount: 10
      },
      powerlogquery: {
        maxResultCount: 10
      },
      usertableData: null,
      setcase: 0
    }
  },
  watch: {
    bookCaseId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  methods: {
    get() {
      if (this.bookCaseId) {
        bookCaseApi.get(this.bookCaseId).then((res) => {
          this.formData = Object.assign(this.formData, res)
          this.deviceid = res.deviceId
          console.log(this.deviceid)
          this.schoolset = this.formData.schoolId
          this.formData.caseInfos = this.formData.caseInfos.sort(function(
            a,
            b
          ) {
            return a.openNum - b.openNum
          })
          console.log('888888888888', res.uvSwTimes)
          if (res.uvSwTimes !== null || res.uvSwTimes.length > 1) {
            // console.log('999999', this.uvTime)
            this.uvTime = JSON.parse(res.uvSwTimes)
            console.log('888888888888', this.uvTime)
          }
          if (res.powerTimes !== null || res.powerTimes.length > 1) {
            this.powerTime = JSON.parse(res.powerTimes)
          }
          // console.log(this.formData)
        })
      }
    },
    getList() {
      this.usersloading = true
      this.query.SchoolId = this.formData.schoolId
      console.log(this.formData.schoolId)
      bookCaseApi.getUsers(this.query).then((res) => {
        this.usertableData = res.items
        this.updateTotalCount(res.totalCount)
        console.log(res)
        this.usersloading = false
      })
    },
    savesetup() {
      console.log('setup', this.formData)
      this.submitBt = true
      this.formData.version = this.formData.version + 1

      this.formData.uvSwTimes = JSON.stringify(this.uvTime)
      this.formData.powerTimes = JSON.stringify(this.powerTime)
      console.log('doPutsetup', this.formData)
      bookCaseApi.put(this.bookCaseId, this.formData).then((res) => {
        this.$message('提交成功')
        this.$emit('successful')
      })
    },
    submitForm() {
      this.submitBt = true
      console.log('提交的数据', this.formData)
      this.$refs.from.validate((valid) => {
        if (valid) {
          this.formData.uvSwTimes = JSON.stringify(this.formData.uvSwTimes)
          let action = null
          if (this.isCreate) {
            action = this.doPost()
          } else {
            action = this.doPut()
          }
          action.then(() => {
            this.$message('提交成功')
            this.$emit('successful')
            this.formData = Object.assign({}, viewModel)
            this.$refs.from.resetFields()
            this.submitBt = false
          })
        } else {
          return false
          this.submitBt = false
        }
      })
    },
    doPost() {
      return bookCaseApi.post(this.formData)
    },
    doPut() {
      this.formData.version = this.formData.version + 1
      console.log('doPutsetup', this.formData)
      return bookCaseApi.put(this.bookCaseId, this.formData).then((res) => {
        this.$message('提交成功')
      })
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    },
    handleClick(tab, event) {
      if (tab.name == 'usersinfo') {
        this.getList()
      }
    },
    schoolSel(schoolId) {
      const school = this.schoolList.find((x) => x.id == schoolId)
      // debugger;
      this.formData.schoolId = schoolId
      this.formData.tenantId = school.tenantId
    },
    opencase(value) {
      const msg = {
        // signaling:{open:this.setcase}
        signaling: { type: 'open', data: this.setcase }
      }
      return bookCaseApi.postPubSignaling(this.formData.deviceId, msg).then((res) => {
        this.$message('开门指令发送成功')
      })
    },
    ledsw(value) {
      const msg = {
        //   signaling:{ledSW:}
        signaling: { type: 'ledSW', data: this.LedSW }
      }
      return bookCaseApi.postPubSignaling(this.formData.deviceId, msg).then((res) => {
        this.$message('指令发送成功')
      })
    },
    uvsw(value) {
      const msg = {
        // signaling:{uvSW:this.LedSW}
        signaling: { type: 'uvSW', data: this.UvSw }
      }
      return bookCaseApi.postPubSignaling(this.formData.deviceId, msg).then((res) => {
        this.$message('指令发送成功')
      })
    }, // AppReboot
    Reboot() {
      const msg = {
        // signaling:{Reboot:true}
        signaling: { type: 'Reboot', data: true }
      }
      return bookCaseApi.postPubSignaling(this.formData.deviceId, msg).then((res) => {
        this.$message('重启指令发送成功')
      })
    },
    AppReboot() {
      const msg = {
        // { "type":"open","data":9}
        signaling: { type: 'AppReboot', data: true }
        // signaling:{AppReboot:true}
      }
      return bookCaseApi.postPubSignaling(this.formData.deviceId, msg).then((res) => {
        this.$message('App重启指令发送成功')
      })
    }
  }
}
</script>
<style scoped>
.tip {
  padding: 2px 4px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 5px 0;
}
</style>
