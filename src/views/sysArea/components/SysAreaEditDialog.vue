<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-05 21:02:19
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="编辑区域"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <SysAreaCreateOrEditForm v-if="dialogVisible" :sys-area-id="sysAreaId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import SysAreaCreateOrEditForm from './SysAreaCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'SysAreaEditDialog',
  components: { SysAreaCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    sysAreaId: {
      type: String,
      default: ''
    }
  }
}
</script>
