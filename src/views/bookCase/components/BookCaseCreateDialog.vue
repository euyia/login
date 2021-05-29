<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-28 04:45:27
* @version V1.0.0
!-->
<template>
  <el-dialog
    title="Create BookCase"
    :visible="dialogVisible"
    :before-close="beforeClose"
    :width="dialogWidth"
    @close="closeDialog"
  >
    <BookCaseCreateOrEditForm v-if="dialogVisible" :schoolList="schoolList" :is-create="true" @cancel="onCancel" @successful="onSuccessful" />
  </el-dialog>
</template>

<script>
import BookCaseCreateOrEditForm from './BookCaseCreateOrEditForm'
import dialogMixin from '@/mixins/dialogMixin'

export default {
  name: 'BookCaseCreateDialog',
  components: { BookCaseCreateOrEditForm },
  mixins: [dialogMixin],
  props: {
    schoolList:Array
  },
  
}
</script>
