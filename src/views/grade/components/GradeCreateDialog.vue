<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-08-10 23:44:14
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create Grade"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <GradeCreateOrEditForm v-if="dialogVisible" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import GradeCreateOrEditForm from './GradeCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'GradeCreateDialog',
  components: { GradeCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
  }
}
</script>
