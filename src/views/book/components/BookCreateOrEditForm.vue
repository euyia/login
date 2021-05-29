<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-24 21:12:51
* @version V1.0.0
!-->
<template>
  <section>
    <el-form
      ref="from"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="right"
      size="mini"
    >
      <el-row>

        <el-col :span="12">
          <el-form-item prop="pic" label="">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHerders"
              :action="uploaderUrl"
              :data="uploaddata"
              :accept="accept"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"            >
              <img v-if="formData.pic"  :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>

       <el-col :span="12">
          <el-form-item
            prop="isbn"
            label="ISBN号"
          >

            <el-input v-model="formData.isbn"  @keyup.enter.native="scanISBN" id='ISBNId'  class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            prop="title"
            label="书名"
          >

            <el-input v-model="formData.title" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="subRitle"
            label="副标题"
          >

            <el-input v-model="formData.subRitle" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="pic"
            label="封面链接"
          >

            <el-input v-model="formData.pic" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="author"
            label="作者"
          >

            <el-input v-model="formData.author" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="summary"
            label="摘要"
          >

            <el-input v-model="formData.summary" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="publisher"
            label="出版社"
          >

            <el-input v-model="formData.publisher" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="pubplace"
            label="出版地"
          >

            <el-input v-model="formData.pubplace" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="pubdate"
            label="出版时间"
          >

            <el-date-picker v-model="formData.pubdate" class="form-item" size="mini" type="date" />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="page"
            label="页数"
          >

            <el-input v-model="formData.page" class="form-item" size="mini" type="number" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="price"
            label="价格"
          >

            <el-input v-model="formData.price" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="binding"
            label="装帧方式"
          >

            <el-input v-model="formData.binding" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            prop="isbn10"
            label="ISBN号10"
          >

            <el-input v-model="formData.isbn10" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="keyword"
            label="主题词"
          >

            <el-input v-model="formData.keyword" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="edition"
            label="版次"
          >

            <el-input v-model="formData.edition" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="impression"
            label="印次"
          >

            <el-input v-model="formData.impression" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="language"
            label="正文语种"
          >

            <el-input v-model="formData.language" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="format"
            label="正文语种"
          >

            <el-input v-model="formData.format" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="types"
            label="书籍类型"
          >
             <el-drag-select v-model="formData.types"  size="mini"  multiple placeholder="请选择">
             <el-option v-for="item in bookType" :key="item.id" :label="item.type" :value="item.id" />
             </el-drag-select>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="zfBookType"
            label="中图法分类"
          >

            <el-input v-model="formData.zfBookType" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="cip"
            label="cip"
          >

            <el-input v-model="formData.cip" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="from-footer">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
    </div>
  </section>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import fromMixin from '@/mixins/formMixin'
import bookApi from '@/api/book'
import { viewModel, rules } from './BookConfig'

export default {
  name: 'BookCreateOrEditForm',
  components: { ElDragSelect },
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    bookId: {
      type: String,
      default: ''
    },
     bookType:Array
  },
  data() {
    return {
      formData: Object.assign({ }, viewModel),
      uploadHerders:{
              Authorization:"Bearer "+localStorage.Token
        },///api/app/faceDetec/faceDectUpload
      imageUrl: '',
      uploaderUrl:process.env.VUE_APP_BASE_API+'/api/BookImage/SaveImages',
      uploaddata: {Name:""},
      accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon", // 可选参数 可上传的图片格式
      rules
    }
  },
  mounted () {
       document.getElementById('ISBNId').focus()
       document.getElementById('ISBNId').select()

    },
  watch: {
    bookId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  methods: {
    //得到焦点选中
    focus(event) {
       event.currentTarget.select();
    },
    get() {
      if (this.bookId) {
        bookApi.getBookInfo(this.bookId).then(res => {
          console.log(res);
          this.formData = Object.assign(this.formData, res)
          if (this.formData.types==null){
            this.formData.types=[];
          }
          this.uploaddata={Name:res.isbn+".jpg"};
          this.getpicurl(res.isbn+".jpg")
        //  this.imageUrl=process.env.VUE_APP_BASE_API+"/api/BookImage/GetbookImages?fileName="+this.formData.pic
          console.log(this.formData)
          console.log(this.bookType)
       })
      }
    },
    submitForm() {
      this.$refs.from.validate((valid) => {
        if (valid) {
          let action = null
          if (this.isCreate) {
            action = this.doPost()
          } else {
            action = this.doPut()
          }
          action.then(() => {
            this.$message('提交成功')
            this.$emit('successful')
            this.formData = Object.assign({}, viewModel)
            this.$refs.from.resetFields()
          })
        } else {
          return false
        }
      })
    },
    scanISBN: function(e) {
      var val = e.target.value;
      var parans={"ISBN":val};
      console.log(val);
      if (val != null) {
        bookApi.getBookByIsbn(parans).then(res => {
          if (res.msg == "ok") {
            this.formData=res.result;
            this.uploaddata={Name:res.result.isbn+".jpg"};
           // this.imageUrl=process.env.VUE_APP_BASE_API+"/api/BookImage/GetbookImages?fileName="+res.result.pic;
          }
        });
      }
    },
    getpicurl(val){
    //  process.env.VUE_APP_BASE_API+"/images/BookThumb/"+val+"?"
     this.imageUrl=process.env.VUE_APP_BASE_API+"/images/BookImage/"+val+"?" + Math.random();
    //  return process.env.VUE_APP_BASE_API+"/api/BookImage/GetbookImages?fileName="+val+'?' + Math.random();
    },
    doPost() {
      return bookApi.post(this.formData)
    },
    doPut() {
      return bookApi.put(this.bookId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    },
     handleAvatarSuccess(res, file) {
        //console.log("上传成功",file);
       // this.imageUrl =process.env.VUE_APP_BASE_API+"/api/BookImage/GetbookImages?fileName="+this.formData.isbn+".jpg";//.fileUrl// URL.createObjectURL(file.raw);
       // this.formData.pic=this.formData.isbn+".jpg"+ '?' + Math.random()
        this.imageUrl =process.env.VUE_APP_BASE_API+"/images/BookImage/"+this.formData.isbn+".jpg"+ '?' + Math.random();
      },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 <5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>
<style scoped>
.avatar {
    width: 128px;
    height: 128px;
    display: block;
    }
</style>
