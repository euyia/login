<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 23:26:04
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Edit BookType"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <BookTypeCreateOrEditForm v-if="dialogVisible" :bookTypeId="bookTypeId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import BookTypeCreateOrEditForm from './BookTypeCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'BookTypeEditDialog',
  components: { BookTypeCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    bookTypeId: {
      type: String,
      default: ''
    }
  }
}
</script>
