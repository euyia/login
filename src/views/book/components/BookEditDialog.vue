<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-24 21:12:51
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Edit Book"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <BookCreateOrEditForm v-if="dialogVisible" :bookId="bookId" :bookType="bookType"  @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import BookCreateOrEditForm from './BookCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'BookEditDialog',
  components: { BookCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    bookId: {
      type: String,
      default: ''
    },
    bookType:Array 
  }
}
</script>
