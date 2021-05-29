<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-08 14:08:57
* @version V1.0.0
!-->
<template>
  <section>
    <el-form
      ref="from"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="rigth"
      size="mini"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            prop="name"
            label="名称"
          >
            <el-input v-model="formData.name" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="schoolType"
            label="学校类型"
          >
            <el-input v-model="formData.schoolType" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
        <el-col v-if="isCreate" :span="12">
          <el-form-item
            prop="name"
            label="管理员密码"
          >
            <el-input v-model="formData.adminPassword" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
        <el-col v-if="isCreate" :span="12">
          <el-form-item
            prop="name"
            label="管理员邮箱"
          >
            <el-input v-model="formData.adminEmailAddress" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="cityId"
            label="区域"
          >
            <el-cascader
              v-model="formData.areaRange"
              size="mini"
              class="form-item"
              placeholder="选择区域"
              :options="areaData"
              filterable
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            prop="subDomain"
            label="登录域名"
          >
            <el-input v-model="formData.subDomain" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item
            prop="schoolInfo"
            label="学校简介"
          >
            <el-input v-model="formData.schoolInfo" class="form-item" size="mini" type="textarea" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="12">
        <el-image
          style="width: 128px; height: 128px"
          :src="url"
          fit="scale-down"></el-image>
         
      </el-col>
      <el-col :span="12">
        <div class="from-footer">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
    </div>
      </el-col>
    </el-row>
    
    
  </section>
</template>

<script>
import fromMixin from '@/mixins/formMixin'
import schoolApi from '@/api/school'
import sysAreaApi from '@/api/sysArea'
import { viewModel, rules } from './SchoolConfig'
import { loopDeleteEmptyProperty } from '@/utils'

export default {
  name: 'SchoolCreateOrEditForm',
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    schoolId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url: process.env.VUE_APP_BASE_API + "/api/app/school/schoolQrCodeImg/",
      formData: Object.assign({ }, viewModel),
      rules,
      areaData: []
    }
  },
  watch: {
    schoolId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  created() {
    this.getAreaData()
  },
  methods: {
    getAreaData() {
      sysAreaApi.getTree().then(res => {
        loopDeleteEmptyProperty(res, 'children')
        this.areaData = res
      })
    },
    get() {
      if (this.schoolId) {
        schoolApi.get(this.schoolId).then(res => {
          this.formData = Object.assign(this.formData, res)
          this.url= process.env.VUE_APP_BASE_API + "/api/app/school/schoolQrCodeImg/"+this.formData.subDomain
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
      return schoolApi.post(this.formData)
    },
    doPut() {
      return schoolApi.put(this.schoolId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
