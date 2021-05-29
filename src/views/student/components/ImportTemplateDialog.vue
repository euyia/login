<template>
  <el-dialog
    title="导入"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <el-form
      ref="from"
      label-position="rigth"
      size="mini"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="选择文件"
          >
            <input ref="files" size="mini" type="file">
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-link type="primary" @click="downloadtemplate">点击下载导入模板</el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="showError" class="err-info">
      <el-alert
        v-if="errData.templateErrors.length > 0"
        title="导入模板错误"
        type="error"
        :closable="false"
      >
        <template>
          <p v-for="(item,index) in errData.templateErrors" :key="index"> 字段：<b>“{{ item.requireColumnName }}”</b> {{ item.message }} </p>
        </template>
      </el-alert>

      <el-alert
        v-if="errData.rowErrors.length > 0"
        title="数据错误"
        type="error"
        :closable="false"
      >
        <template>
          <p v-for="(item,index) in errData.rowErrors" :key="index">
            第<b>{{ item.rowIndex }}</b>行：
            {{ item.fieldErrors }}
          </p>
        </template>
      </el-alert>
    </div>
    <div class="from-footer">
      <el-button size="mini" @click="onCancel">取消</el-button>
      <el-button :loading="loading" type="primary" size="mini" @click="submitForm">上传</el-button>
    </div>

  </el-dialog>
</template>

<script>
import dialogMixin from '@/mixins/dialogMixin'
import studentApi from '@/api/student'

export default {
  name: 'ImportTemplateDialog',
  mixins: [dialogMixin],
  data() {
    return {
      loading: false,
      showError: false,
      errData: {
        templateErrors: [],
        rowErrors: [],
        exceptionMessage: null
      }
    }
  },
  methods: {
    downloadtemplate() {
      window.open(process.env.VUE_APP_BASE_API + '/api/app/student/downloadTemplate')
    },
    closeDialog(refresh = false) {
      this.$emit('close', refresh)
      this.updateVisible(false)
      this.showError = false
      this.$refs['files'].value = ''
    },
    submitForm() {
      var fileEl = this.$refs['files']
      if (fileEl.files.length === 0) {
        return this.$message('请选择文件')
      }
      this.showError = false
      const param = new FormData()
      param.append('file', fileEl.files[0])
      this.loading = true
      studentApi.postImport(param).then(res => {
        this.loading = false
        if (res.success === false) {
          this.errData = res
          this.showError = true
        } else {
          this.onSuccessful()
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.err-info{
  ::v-deep .el-alert{
    margin-bottom:10px;
  }
}
</style>
