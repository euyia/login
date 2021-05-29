<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 13:04:18
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
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.pic"  :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>

          <el-col :span="12">
          <el-form-item
            prop="isbn"
            label="isbn"
          >

            <el-input v-model="formData.isbn" class="form-item"   @keyup.enter.native="scanISBN" size="mini" clearable />

          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            prop="title"
            label="title"
          >

            <el-input v-model="formData.title" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="subRitle"
            label="subRitle"
          >

            <el-input v-model="formData.subRitle" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="author"
            label="author"
          >

            <el-input v-model="formData.author" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="summary"
            label="summary"
          >

            <el-input v-model="formData.summary" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="publisher"
            label="publisher"
          >

            <el-input v-model="formData.publisher" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="pubplace"
            label="pubplace"
          >

            <el-input v-model="formData.pubplace" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="pubdate"
            label="pubdate"
          >

            <el-date-picker v-model="formData.pubdate" class="form-item" size="mini" type="date" />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="page"
            label="page"
          >

            <el-input v-model="formData.page" class="form-item" size="mini" type="number" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="price"
            label="price"
          >

            <el-input v-model="formData.price" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="binding"
            label="binding"
          >

            <el-input v-model="formData.binding" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            prop="isbn10"
            label="isbn10"
          >

            <el-input v-model="formData.isbn10" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="keyword"
            label="keyword"
          >

            <el-input v-model="formData.keyword" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="edition"
            label="edition"
          >

            <el-input v-model="formData.edition" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="impression"
            label="impression"
          >

            <el-input v-model="formData.impression" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="language"
            label="language"
          >

            <el-input v-model="formData.language" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="format"
            label="format"
          >

            <el-input v-model="formData.format" class="form-item" size="mini" clearable />

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="types"
            label="Types"
          >
             <el-drag-select v-model="formData.types"  size="mini"  multiple placeholder="请选择">
             <el-option v-for="item in bookType" :key="item.id" :label="item.type" :value="item.id" />
             </el-drag-select>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="zfBookType"
            label="zfBookType"
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
        },
      imageUrl: '',
      uploaderUrl:"",
      uploaddata: {Name:""},
      accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon", // 可选参数 可上传的图片格式
      rules,

    }
  },
 
  watch: {
    bookId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    },
    
  },
  methods: {
    get() {
      if (this.bookId) {
        bookApi.get(this.bookId).then(res => {
          this.formData = Object.assign(this.formData, res)
          if (this.formData.types==null){
            this.formData.types=[];
          }
          this.imageUrl=process.env.VUE_APP_BASE_API+"/images/BookImage/"+this.formData.pic;
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
     scanISBN: function(e) {
      var val = e.target.value;
      var parans={"ISBN":val};
      console.log(val);
      if (val != null) {
        bookApi.getBookInfo(parans).then(res => {
          if (res.msg == "ok") {
            // this.formData=Object.assign(this.formData, res.result)
            this.formData.author = res.result.author;
            this.formData.binding = res.result.binding;
            this.formData.cip = res.result.cip;
            this.formData.zfBookType = res.result.class;
            this.formData.edition = res.result.edition;
            this.formData.format = res.result.format;
            this.formData.impression = res.result.impression;
            this.formData.isbn = res.result.isbn;
            this.formData.isbn10 = res.result.isbn10;
            this.formData.keyword = res.result.keyword;
            this.formData.language =res.result.language;
            this.formData.page = res.result.page;
            this.formData.pic =res.result.pic;
            this.formData.imageUrl=res.result.imageUrl;
            this.formData.subtitle = res.result.subtitle;
            this.formData.summary = res.result.summary;
            this.formData.title = res.result.title;
            
            this.formData.types=[];
           // if (res.rules.type==null){
           //   this.formData.type=0
           // }
            this.uploaddata={Name:res.result.isbn};
            this.imageUrl=process.env.VUE_APP_BASE_API+"/images/BookImage/"+res.result.pic;
            console.log(this.imageUrl)
          }
        });
      }
    },
    handleAvatarSuccess(res, file) {
        console.log("上传成功",file);
        this.imageUrl =res.fileUrl// URL.createObjectURL(file.raw);
        this.formData.pic=res.fileUrl
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
