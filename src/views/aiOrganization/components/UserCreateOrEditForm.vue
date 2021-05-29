<template>
  <section>
     <el-form
          ref="dataForm"
          :model="formData"
          :rules="rules"
          label-position="right"
          label-width="120px"
          v-loading="loading"
        >
    <el-tabs v-model="activeTabName"  @tab-click="tabClick">

          <el-tab-pane label="用户信息" name="userinfo">
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
              <el-form-item prop="lockoutEnabled" label="登录失败,账户被锁定">
                <el-switch v-model="formData.lockoutEnabled" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="twoFactorEnabled" label="二次认证">
                <el-switch v-model="formData.twoFactorEnabled" />
              </el-form-item>
            </el-col>
          </el-row>

      </el-tab-pane>
      <el-tab-pane label="角色" name="roles">
          <el-form-item>
            <el-checkbox-group v-model="formData.roleNames">
              <el-checkbox
                v-for="(item, index) in roles"
                :key="index"
                :label="item.name"
                name="role"
              />
            </el-checkbox-group>
          </el-form-item>

      </el-tab-pane>
      <el-tab-pane label="部门">
        <el-form-item>
          <org-tree
            ref="dialogOrgTree"
            :show-checkbox="true"
            :check-strictly="true"
            :support-single-checked="singleChecked"
            @handleCheckChange="handleCheckChange"
          />
        </el-form-item>
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
       </el-tab-pane>
      <el-divider />
      <div class="from-footer">
        <el-button size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="submitForm"
          >提交</el-button
        >
      </div>
    </el-tabs>
     </el-form>
  </section>
</template>

<script>
import fromMixin from "@/mixins/formMixin";
import userApi from "@/api/user";
import aiUser from "@/api/aiUser";
import OrgTree from "./org-tree.vue";
import { viewModel, rules } from "./UserConfig";

export default {
  name: "UserCreateOrEditForm",
   components: {OrgTree},
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
    },
    orgIds: {
      type: Array,
      default: function() {
        return [];
      }
    }

  },
  data() {
    return {
      singleChecked: false,
      activeTabName: "userinfo",
      loading:false,
      uploadHerders: {
        Authorization: "Bearer " + localStorage.Token
      }, //facede/{UserId
      imageUrl: "",
       faceinfo: "点击上传人脸",
      uploaderUrl: process.env.VUE_APP_BASE_API + "/facede/",
      formData: Object.assign({}, viewModel),
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
    async get() {
     console.log(this.userId)
      if (this.userId) {
         this.loading=true
        rules["password"][0].required = false;
        const user = await userApi.get(this.userId);
        this.formData = Object.assign(this.formData, user);
        const roles = await userApi.getRoles(this.userId);
        this.formData.roleNames = roles.items.map(x => x.name);
        const orgIds=await aiUser.getOrganizations(this.userId);
        this.formData.orgIds=orgIds.items.map(item => item.id)
        this.$refs.dialogOrgTree.$refs.orgTree.setCheckedKeys([])
        this.$refs.dialogOrgTree.$refs.orgTree.setCheckedKeys(this.formData.orgIds)
        this.$refs['dataForm'].clearValidate()
        this.loading=false
        this.uploaderUrl =
          process.env.VUE_APP_BASE_API + "/facede/" + _this.formData.id;
        this.imageUrl =
          process.env.VUE_APP_BASE_API +
          "/images/FaceThumb/" +
          _this.formData.id +
          ".jpg";

      }
    },
    submitForm() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          let action = null;
          console.log(this.isCreate)
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
    doPost() {
      return aiUser.postCreateToOrganizations(this.formData);
    },
    doPut() {
       //userApi.post(this.formData)
      return aiUser.putUpdateToOrganizations(this.userId,this.formData);;
    },
    cancel() {
      this.$emit("cancel");
    },
    handleCheckChange(data, orgIds) {
      // singleChecked
      if (orgIds) {
        this.formData.orgIds = orgIds;
      }
    },
    tabClick(tab, event) {
     console.log(tab, event);
     if (tab.name == "Attach") {
         console.log( "Attach");
     }
    },
    deleteFace(id){
      studentApi.deletefaceId(this.formData.id).then(res => {
          console.log(res);
         // this.parents = res;
        });
    },
     handleAvatarSuccess(res, file) {
      let _this = this;
      console.log(res);
      if (res.success == true) {
        _this.formData.faceImg = this.formData.id + ".jpg";
        this.faceinfo = "检测成功";
        _this.imageUrl = URL.createObjectURL(file.raw);
      } else {
        this.faceinfo = "检测失败重新上传人脸";
      }
    },
    beforeAvatarUpload(file) {
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
};
</script>
