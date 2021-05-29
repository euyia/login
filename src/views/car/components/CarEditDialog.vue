<!--
* @description Created by AbpVueCli
* @author zhk
* @date 2020-08-05 13:46:14
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Edit Car"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <CarCreateOrEditForm v-if="dialogVisible" :carId="carId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import CarCreateOrEditForm from './CarCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'CarEditDialog',
  components: { CarCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    carId: {
      type: String,
      default: ''
    }
  }
}
</script>
