<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-11 14:02:48
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create Class"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <ClassCreateOrEditForm v-if="dialogVisible" :grade-id="gradeId" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import ClassCreateOrEditForm from './ClassCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'ClassCreateDialog',
  components: { ClassCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    gradeId: {
      type: String,
      default: ''
    }
  }
}
</script>
