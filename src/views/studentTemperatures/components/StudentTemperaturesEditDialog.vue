<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-25 02:13:41
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Edit StudentTemperatures"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <StudentTemperaturesCreateOrEditForm v-if="dialogVisible" :studentTemperaturesId="studentTemperaturesId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import StudentTemperaturesCreateOrEditForm from './StudentTemperaturesCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'StudentTemperaturesEditDialog',
  components: { StudentTemperaturesCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    studentTemperaturesId: {
      type: String,
      default: ''
    }
  }
}
</script>
