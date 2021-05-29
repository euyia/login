<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-11 14:02:48
* @version V1.0.0
!-->
<template>
  <section>
    <el-form
      ref="from"
      :model="formData"
      :rules="rules"
      label-width="100px"
      label-position="right"
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
        <el-col :span="24">
          <el-form-item
            prop="desc"
            label="描述"
          >
            <el-input v-model="formData.desc" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
         <el-col :span="24">
          <el-form-item
            prop="teacherId"
            label="老师"
          >
            <el-input v-model="formData.desc" class="form-item" size="mini" clearable />
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
import classApi from '@/api/class'
import { viewModel, rules } from './ClassConfig'

export default {
  name: 'ClassCreateOrEditForm',
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    classId: {
      type: String,
      default: ''
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
    classId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  methods: {
    get() {
      if (this.classId) {
        classApi.get(this.classId).then(res => {
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
      return classApi.post(Object.assign(this.formData, { gradeId: this.gradeId }))
    },
    doPut() {
      return classApi.put(this.classId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
