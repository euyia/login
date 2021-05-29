<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-25 02:13:40
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create StudentTemperatures"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <StudentTemperaturesCreateOrEditForm v-if="dialogVisible" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import StudentTemperaturesCreateOrEditForm from './StudentTemperaturesCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'StudentTemperaturesCreateDialog',
  components: { StudentTemperaturesCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
  }
}
</script>
