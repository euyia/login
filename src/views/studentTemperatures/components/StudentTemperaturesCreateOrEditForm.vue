<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-25 02:13:40
* @version V1.0.0
!-->
<template>
  <section>
    <el-form
      ref="from"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="top"
      size="mini"
    >
      <el-row>

        <el-col :span="12">
          <el-form-item
            prop="studentId"
            label="用户ID"
          >

            <el-input v-model="formData.studentId" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="temperature"
            label="温度"
          >

            <el-input v-model="formData.temperature" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="isAbnormal"
            label="是否异常"
          >

            <el-switch v-model="formData.isAbnormal" />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="checkDateTime"
            label="检测时间"
          >

            <el-date-picker v-model="formData.checkDateTime" class="form-item" size="mini" type="date" />

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="from-footer">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
    </div>
  </section>
</template>

<script>
import fromMixin from '@/mixins/formMixin'
import studentTemperaturesApi from '@/api/studentTemperatures'
import { viewModel, rules } from './StudentTemperaturesConfig'

export default {
  name: 'StudentTemperaturesCreateOrEditForm',
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    studentTemperaturesId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: Object.assign({ }, viewModel),
      rules
    }
  },
  watch: {
    studentTemperaturesId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  methods: {
    get() {
      if (this.studentTemperaturesId) {
        studentTemperaturesApi.get(this.studentTemperaturesId).then(res => {
          this.formData = Object.assign(this.formData, res)
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
      return studentTemperaturesApi.post(this.formData)
    },
    doPut() {
      return studentTemperaturesApi.put(this.studentTemperaturesId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
