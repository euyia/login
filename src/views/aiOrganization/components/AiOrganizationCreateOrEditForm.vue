<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-26 21:57:18
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
            prop="parentId"
            label="parentId"
          >

            <el-input v-model="formData.parentId" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="displayName"
            label="displayName"
          >

            <el-input v-model="formData.displayName" class="form-item" size="mini" clearable />

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
      <el-button type="primary" size="mini" :loading="submitload" @click="submitForm">提交</el-button>
    </div>
  </section>
</template>

<script>
import fromMixin from '@/mixins/formMixin'
import aiOrganizationApi from '@/api/aiOrganization'
import { viewModel, rules } from './AiOrganizationConfig'

export default {
  name: 'AiOrganizationCreateOrEditForm',
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    aiOrganizationId: {
      type: String,
      default: ''
    },
    createAiOrganizationId:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: Object.assign({ }, viewModel),
      submitload:false,
      rules
    }
  },
  watch: {
    aiOrganizationId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  methods: {
    get() {
     // console.log(this.createAiOrganizationId)
      this.formData.parentId=this.createAiOrganizationId
      if (this.aiOrganizationId) {
        aiOrganizationApi.get(this.aiOrganizationId).then(res => {
          this.formData = Object.assign(this.formData, res)
        })
      }
    },
    submitForm() {
      this.submitload=true
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
            this.submitload=false;
          })
        } else {
          his.submitload=false;
          return false
        }
      })
    },
    doPost() {
      if (this.createAiOrganizationId!=undefined){
        this.formData.parentId=this.createAiOrganizationId
      }
      return aiOrganizationApi.post(this.formData)
    },
    doPut() {
      return aiOrganizationApi.put(this.aiOrganizationId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
