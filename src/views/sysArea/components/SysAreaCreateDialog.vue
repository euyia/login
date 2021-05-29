<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-05 21:02:19
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="新增区域"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <SysAreaCreateOrEditForm v-if="dialogVisible" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import SysAreaCreateOrEditForm from './SysAreaCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'SysAreaCreateDialog',
  components: { SysAreaCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
  }
}
</script>
