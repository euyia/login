<!--
* @description Created by AbpVueCli
* @author zhk
* @date 2020-08-05 13:46:14
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create Car"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <CarCreateOrEditForm v-if="dialogVisible" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import CarCreateOrEditForm from './CarCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'CarCreateDialog',
  components: { CarCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
  }
}
</script>
