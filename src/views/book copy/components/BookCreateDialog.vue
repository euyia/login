<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 13:04:18
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create Book"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <BookCreateOrEditForm v-if="dialogVisible" :is-create="true" :bookType="bookType"  @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import BookCreateOrEditForm from './BookCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'BookCreateDialog',
  components: { BookCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    bookType:Array
  }
}
</script>
