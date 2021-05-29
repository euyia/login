<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-27 02:05:20
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create AiClaimType"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <AiClaimTypeCreateOrEditForm v-if="dialogVisible" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import AiClaimTypeCreateOrEditForm from './AiClaimTypeCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'AiClaimTypeCreateDialog',
  components: { AiClaimTypeCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
  }
}
</script>
