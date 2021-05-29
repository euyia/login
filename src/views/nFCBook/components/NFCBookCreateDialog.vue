<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 23:27:38
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="图书上架"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <NFCBookCreateOrEditForm v-if="dialogVisible" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import NFCBookCreateOrEditForm from './NFCBookCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'NFCBookCreateDialog',
  components: { NFCBookCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
  }
}
</script>
