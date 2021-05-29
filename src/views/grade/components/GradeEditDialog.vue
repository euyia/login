<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-10 20:10:51
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Edit Grade"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <GradeCreateOrEditForm v-if="dialogVisible" :grade-id="gradeId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import GradeCreateOrEditForm from './GradeCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'GradeEditDialog',
  components: { GradeCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    gradeId: {
      type: String,
      default: ''
    }
  }
}
</script>
