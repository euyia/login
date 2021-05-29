<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-20 19:16:59
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create Order"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <OrderCreateOrEditForm v-if="dialogVisible" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import OrderCreateOrEditForm from './OrderCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'OrderCreateDialog',
  components: { OrderCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
  }
}
</script>
