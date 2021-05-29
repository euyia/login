<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 23:26:04
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

        <el-col :span="24">

          <el-form-item
            prop="type"
            label="type"
          >
            <el-input v-model="formData.type" class="form-item" size="mini" clearable />

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
import bookTypeApi from '@/api/bookType'

import { viewModel, rules } from './BookTypeConfig'

export default {
  name: 'BookTypeCreateOrEditForm',
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    bookTypeId: {
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
    bookTypeId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  methods: {
    get() {
      if (this.bookTypeId) {
        bookTypeApi.get(this.bookTypeId).then(res => {
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
      return bookTypeApi.post(this.formData)
    },
    doPut() {
      return bookTypeApi.put(this.bookTypeId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
