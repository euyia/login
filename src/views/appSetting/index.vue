<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 23:26:04
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">


    </div>
    <div class="app-full-body">
      <el-row>
         <el-col :span="24">
       <el-card shadow="hover">
        <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button  style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="text item">
         <el-col :span="24">
           <label style="float: left; padding: 3px 0">RequiredLength</label><el-input-number style="float: right;"></el-input-number>
           </el-col>
        </div>
      </el-card> 
       </el-col> 
      </el-row>
    </div>
    <div class="app-full-footer">

    </div>
    

  </div>
</template>

<script>
//import listMixin from '@/mixins/listMixin'
import bookTypeApi from '@/api/appSetting'
import appSetting from '@/api/appSetting'
//import Pagination from '@/components/Pagination'
//import CreateDialog from './components/BookTypeCreateDialog'
//import EditDialog from './components/BookTypeEditDialog'

export default {
  name: 'Index',
//  components: { CreateDialog, EditDialog, Pagination },
//  mixins: [listMixin],
  data() {
    return {
      passwordDate:[],
      AirFaceDate:[],
      imagPaht:[]
      
    }
  },
  created() {
    
  },
  methods: {
    getpasswordsetup(){
      appSetting.getpasswordsetup
    }
    
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 320px;
  }
</style>
