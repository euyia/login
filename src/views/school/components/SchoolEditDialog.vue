<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-08 14:08:57
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="编辑学校"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <SchoolCreateOrEditForm v-if="dialogVisible" :school-id="schoolId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import SchoolCreateOrEditForm from './SchoolCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'SchoolEditDialog',
  components: { SchoolCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    schoolId: {
      type: String,
      default: ''
    }
  }
}
</script>
