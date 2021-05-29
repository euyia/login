<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-26 21:57:18
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Edit AiOrganization"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <AiOrganizationCreateOrEditForm v-if="dialogVisible" :aiOrganizationId="aiOrganizationId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import AiOrganizationCreateOrEditForm from './AiOrganizationCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'AiOrganizationEditDialog',
  components: { AiOrganizationCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    aiOrganizationId: {
      type: String,
      default: ''
    }
  }
}
</script>
