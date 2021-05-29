<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 23:27:38
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="更新图书上架信息"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <NFCBookCreateOrEditForm v-if="dialogVisible" :nFCBookId="nFCBookId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import NFCBookCreateOrEditForm from './NFCBookCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'NFCBookEditDialog',
  components: { NFCBookCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    nFCBookId: {
      type: String,
      default: ''
    }
  }
}
</script>
