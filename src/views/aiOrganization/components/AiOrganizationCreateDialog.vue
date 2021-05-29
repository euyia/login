<!--
* @description Created by AbpVueCli
* @author 宏杰
* @date 2020-09-26 21:57:18
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create AiOrganization"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <AiOrganizationCreateOrEditForm v-if="dialogVisible" :createAiOrganizationId="createAiOrganizationId" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import AiOrganizationCreateOrEditForm from './AiOrganizationCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'AiOrganizationCreateDialog',
  components: { AiOrganizationCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    createAiOrganizationId:{
      type: String,
      default: ''
    }
  }
}
</script>
