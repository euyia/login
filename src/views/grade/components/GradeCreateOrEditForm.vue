<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-10 20:10:51
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
            prop="name"
            label="名称"
          >
            <el-input v-model="formData.name" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="from-footer">
      <el-button v-if="!isCreate" type="danger" size="mini" @click="del">删除</el-button>
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
    </div>
  </section>
</template>

<script>
import fromMixin from '@/mixins/formMixin'
import gradeApi from '@/api/grade'
import { viewModel, rules } from './GradeConfig'

export default {
  name: 'GradeCreateOrEditForm',
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    gradeId: {
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
    gradeId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  methods: {
    get() {
      if (this.gradeId) {
        gradeApi.get(this.gradeId).then(res => {
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
      return gradeApi.post(this.formData)
    },
    doPut() {
      return gradeApi.put(this.gradeId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    },
    del() {
      gradeApi.delete(this.gradeId).then(() => {
        this.$message('删除成功')
        this.$emit('successful')
      })
    }
  }
}
</script>
