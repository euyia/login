<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-20 19:16:59
* @version V1.0.0
!-->
<template>
  <section>
    <el-form
      ref="from"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="left"
      size="mini"
    >
      <el-form-item
        prop="orderNo"
        label="订单号"
      >
        <el-input
          v-model="formData.orderNo"
          class="form-item"
          size="mini"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="returnTime"
        label="returnTime"
      >
        <el-input
          v-model="formData.returnTime"
          class="form-item"
          size="mini"
          clearable
        />
      </el-form-item>

      <el-form-item
        prop="borrowerName"
        label="读者"
      >
        <el-input
          v-model="formData.borrowerName"
          class="form-item"
          size="mini"
          clearable
        />
      </el-form-item>

      <el-form-item
        prop="deviceTag"
        label="书柜"
      >

        <el-input
          v-model="formData.deviceTag"
          class="form-item"
          size="mini"
          clearable
        />

      </el-form-item>

      <el-form-item
        prop="books"
        label=""
      >
        <el-table
          :data="formData.books"
          highlight-current-row
          style="width: 100%"
          size="mini"
        >
          <el-table-column
            prop="name"
            label="name"
            width="160"
            sortable="custom"
          />
          <el-table-column
            prop="isbn"
            label="isbn"
            width="160"
            sortable="custom"
          />
          <el-table-column
            prop="nfcId"
            label="nfcId"
            width="160"
            sortable="custom"
          />
          <el-table-column
            prop="state"
            label="state"
            width="80"
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
            width="100"
          />

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link

                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row)"
              >编辑</el-link>

            </template>
          </el-table-column>

        </el-table>

      </el-form-item>
    </el-form>
    <div class="from-footer">
      <el-button
        size="mini"
        @click="cancel"
      >取消</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="submitForm"
      >提交</el-button>
    </div>
  </section>
</template>

<script>
import fromMixin from '@/mixins/formMixin'
import orderApi from '@/api/order'
import { viewModel, rules } from './OrderConfig'

export default {
  name: 'OrderCreateOrEditForm',
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: Object.assign({}, viewModel),
      rules
    }
  },
  watch: {
    orderId: {
      immediate: true,
      handler: function() {
        // console.log('88888', orderId)
        this.get()
      }
    }
  },
  methods: {
    get() {
      console.log('88888', this.orderId)
      if (this.orderId) {
        orderApi.getorderInfo(this.orderId).then((res) => {
          // console.log('88888888', res)
          this.formData = Object.assign(this.formData, res)
          console.log('88888888', this.formData)
        })
      }
    },
    submitForm() {
      this.$refs.from.validate((valid) => {
        if (valid) {
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
          })
        } else {
          return false
        }
      })
    },
    doPost() {
      return orderApi.post(this.formData)
    },
    doPut() {
      return orderApi.put(this.orderId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
