<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-24 21:12:51
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="添加书籍"
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
