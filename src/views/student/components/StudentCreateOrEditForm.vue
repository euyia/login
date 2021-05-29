<template>
  <section>
    <el-tabs v-model="activeTabName" @tab-click="tabClick">
      <el-tab-pane label="用户信息" name="userinfo">
        <el-form
          ref="from"
          :model="formData"
          :rules="rules"
          label-width="100px"
          label-position="right"
          size="mini"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item prop="userName" label="用户名称">
                <el-input v-model="formData.userName" size="mini" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="surname" label="姓">
                <el-input v-model="formData.surname" size="mini" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="name" label="名">
                <el-input v-model="formData.name" size="mini" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="password" label="密码">
                <el-input v-model="formData.password" size="mini" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="email" label="邮箱地址">
                <el-input v-model="formData.email" size="mini" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="contractType" label="手机号">
                <el-input
                  v-model="formData.phoneNumber"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="studentNumber" label="学号">
                <el-input
                  v-model="formData.studentNumber"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
             <el-col :span="24">
              <el-form-item prop="librarycard" label="借书证号">
                <el-input
                  v-model="formData.librarycard"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="address" label="地址">
                <el-input v-model="formData.address" size="mini" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="faceId" label="人脸">
                <el-switch :value="formtFace(formData.faceId)" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="lockoutEnabled" label="登录失败,锁定账户">
                <el-switch v-model="formData.lockoutEnabled" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="twoFactorEnabled" label="二次认证">
                <el-switch v-model="formData.twoFactorEnabled" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider />
        <div class="from-footer">
          <el-button size="mini" @click="cancel">取消</el-button>
          <el-button type="primary" size="mini" @click="submitForm"
            >提交</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="附加信息" name="Attach">
        <el-form size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <el-upload
                  class="avatar-uploader"
                  :headers="uploadHerders"
                  :action="uploaderUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="formData.faceImg" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="el-upload__text">{{ faceinfo }}</div>
                </el-upload>
              </el-form-item>
              <el-form-item prop="pic" label=""> </el-form-item>
            </el-col>
            <el-col :span="12">
             <el-table-column fixed="right" label="操作" width="100">
             <template >
              <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteFace" circle></el-button>
            </template>
          </el-table-column>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <span>关系人</span>
          <el-button style="float:right" size="mini"  type="primary" @click="dialogVisible = true" icon="el-icon-plus"  >添加关注人</el-button>
          <el-divider></el-divider>
        </div>
        <el-table :data="parents" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="电话" width="160">
          </el-table-column>
          <el-table-column prop="type" label="关系" width="100">
          </el-table-column>
          <el-table-column prop="phoneNumberConfirmed" label="激活">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template  slot-scope="scope" >
              <el-button type="danger" size="small" icon="el-icon-delete" @click="delparent(scope.row)" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider/>

      </el-tab-pane>
    </el-tabs>
  <el-dialog
  title="查找关系人"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose"
   append-to-body>
  <span slot="footer" class="dialog-footer">
     <el-form
          ref="from"
          :model="formData"
          :rules="rules"
          label-width="100px"
          label-position="right"
          size="mini"
        >
     <el-row>
     <el-col :span="24">
              <el-form-item prop="contractType" label="手机号">
                <el-input
                  v-model="scuser"
                  size="mini"
                  clearable
                />
                </el-form-item>
                 <el-button @click="scanuser()" >搜索</el-button>
        </el-col>
     </el-row>
     </el-form>
     <el-divider/>

        <el-divider/>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" :loading="addparenlongin"  :disabled="addparen" @click="addparenuser" >确 定</el-button>
  </span>
</el-dialog>
  </section>
</template>

<script>
import fromMixin from "@/mixins/formMixin";
import userApi from "@/api/user";
import studentApi from "@/api/student";
import userInfoApi from "@/api/userInfo";
import { viewModel, rules } from "./StudentConfig";

export default {
  name: "UserCreateOrEditForm",
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ""
    },
    roles: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      activeTabName: "userinfo",
      faceinfo: "点击上传人脸",
      dialogVisible: false,
      formData: Object.assign({}, viewModel),
      uploadHerders: {
        Authorization: "Bearer " + localStorage.Token
      }, //facede/{UserId}
      scuser:"",
      addparenlongin:false,
      addparen:true,
      scparentinfo:"",
      imageUrl: "",
      parents: [],
      uploaderUrl: process.env.VUE_APP_BASE_API + "/facede/",
      rules
    };
  },
  watch: {
    userId: {
      immediate: true,
      handler: function() {
        this.get();
      }
    }
  },
  methods: {
     tabClick(tab, event) {
     console.log(tab, event);
     if (tab.name == "Attach") {
       studentApi.getparents(this.userId).then(res => {
       //  console.log(res);
         this.parents = res;
       });
     }
    },
    async get() {
      let _this = this;
      console.log(this.userId);
      if (_this.userId) {
        rules["password"][0].required = false;
        const user = await userInfoApi.getUserInfo(_this.userId);
        _this.formData = Object.assign(_this.formData, user);

        const roles = await userApi.getRoles(_this.userId);
        console.log(roles);
        _this.formData.roleNames = roles.items.map(x => x.name);
        _this.uploaderUrl =
          process.env.VUE_APP_BASE_API + "/facede/" + _this.formData.id;
        _this.imageUrl =
          process.env.VUE_APP_BASE_API +
          "/images/FaceThumb/" +
          _this.formData.id +
          ".jpg";
      }
    },
    formtFace(val) {
      if (val != null) {
        return true;
      }
      return false;
    },
    getpicurl(val) {
      return process.env.VUE_APP_BASE_API + "/images/FaceThumb/" + val;
    },
    submitForm() {
      if (this.formData.email == "") {
        this.formData.email = this.formData.studentNumber + "@xyai.com";
      }
      this.$refs.from.validate(valid => {
        if (valid) {
          let action = null;
          if (this.isCreate) {
            action = this.doPost();
          } else {
            action = this.doPut();
          }

          action.then(() => {
            this.$message("提交成功");
            this.$emit("successful");
            this.formData = Object.assign({}, viewModel);
            this.$refs.from.resetFields();
          });
        } else {
          return false;
        }
      });
    },
    deleteFace(id){
      studentApi.deletefaceId(this.formData.id).then(res => {
          console.log(res);
         // this.parents = res;
        });
    },
    scanuser(){
      var params={
        phoneNumber:this.scuser
      }
      studentApi.getparentuser(params).then(res=>{
      console.log(res)
      this.addparen=false
      this.scparentinfo=res
      })
    },
    addparenuser(){
     this.addparenlongin=true
      var params={
        studentId:this.userId,
        parentId:this.scparentinfo.id

      }
      studentApi.putAddparentId(params).then(res=>{
        studentApi.getparents(this.userId).then(res => {
        // console.log(res);
         this.parents = res;
      })
          this.addparenlongin=false
          this.dialogVisible=false
      })

      this.dialogVisible = true
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

    delparent(val){
      console.log(val)
      var params={
         studentId:this.userId,
         parentId:val.id
      }
      return  studentApi.deleteDelparent(params).then(res=>{
         studentApi.getparents(this.userId).then(res => {
        // console.log(res);
         this.parents = res;
      })
      })
      },

    doPost() {
      return userApi.post(this.formData);
    },
    doPut() {
      return userApi.put(this.userId, this.formData);
    },
    cancel() {
      this.$emit("cancel");
    },
    handleAvatarSuccess(res, file) {
      //console.log("上传成功",file);
      // this.imageUrl =process.env.VUE_APP_BASE_API+"/api/BookImage/GetbookImages?fileName="+this.formData.isbn+".jpg";//.fileUrl// URL.createObjectURL(file.raw);
      let _this = this;
      console.log(res);
      if (res.success == true) {
        _this.formData.faceImg = this.formData.id + ".jpg";
        this.faceinfo = "检测成功";
        _this.imageUrl = URL.createObjectURL(file.raw); //process.env.VUE_APP_BASE_API+"/images/FaceThumb/"+this.formData.id+'.jpg';
      } else {
        this.faceinfo = "检测失败重新上传人脸";
      }
    },
    beforeAvatarUpload(file) {
      //   this.uploaderUrl=process.env.VUE_APP_BASE_API+'/facede/'+this.formData.id
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
  }

</script>
<style scoped>
.avatar {
  width: 96px;
  height: 96px;
  display: block;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 96px;
  height: 96px;
  line-height: 96px;
  text-align: center;
}
</style>
