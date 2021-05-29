<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-27 02:05:20
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
            prop="name"
            label="name"
          >

            <el-input v-model="formData.name" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="required"
            label="required"
          >

            <el-switch v-model="formData.required" />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="regex"
            label="regex"
          >

            <el-input v-model="formData.regex" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="regexDescription"
            label="regexDescription"
          >

            <el-input v-model="formData.regexDescription" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="description"
            label="description"
          >

            <el-input v-model="formData.description" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="valueType"
            label="valueType"
          >

            <el-input v-model="formData.valueType" class="form-item" size="mini" type="number" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="extraProperties"
            label="extraProperties"
          >

            <el-input v-model="formData.extraProperties" class="form-item" size="mini" clearable />

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
import aiClaimTypeApi from '@/api/aiClaimType'
import { viewModel, rules } from './AiClaimTypeConfig'

export default {
  name: 'AiClaimTypeCreateOrEditForm',
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    aiClaimTypeId: {
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
    aiClaimTypeId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  methods: {
    get() {
      if (this.aiClaimTypeId) {
        aiClaimTypeApi.get(this.aiClaimTypeId).then(res => {
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
      return aiClaimTypeApi.post(this.formData)
    },
    doPut() {
      return aiClaimTypeApi.put(this.aiClaimTypeId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
