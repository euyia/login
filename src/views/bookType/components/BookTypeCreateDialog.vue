<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 23:26:04
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create BookType"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <BookTypeCreateOrEditForm v-if="dialogVisible" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import BookTypeCreateOrEditForm from './BookTypeCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'BookTypeCreateDialog',
  components: { BookTypeCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
  }
}
</script>
