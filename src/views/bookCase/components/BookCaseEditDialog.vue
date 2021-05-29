<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-28 04:45:28
* @version V1.0.0
!-->
<template>
  <el-dialog  
    title="编辑 书柜信息"   
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <BookCaseCreateOrEditForm v-if="dialogVisible" :schoolList="schoolList" :bookCaseId="bookCaseId" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import BookCaseCreateOrEditForm from './BookCaseCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'BookCaseEditDialog',
  components: { BookCaseCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    bookCaseId: {
      type: String,
      default: 0
    },
    schoolList:Array
  }
}
</script>
