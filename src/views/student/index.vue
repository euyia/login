<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-06 19:25:43
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">
      <el-select
        v-if="tenantshow"
        v-model="schoolset"
        placeholder="请选择"
        size="mini"
        @change="schoolSel"
      >
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-select
        v-model="query.GradeName"
        clearable
        placeholder="请选择年级"
        size="mini"
        @change="GradeSet"
      >
        <el-option
          v-for="item in gradelList"
          :key="item.index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-select
        v-model="query.ClassName"
        clearable
        placeholder="请选择班级级"
        size="mini"
        @change="ClassSet"
      >
        <el-option
          v-for="item in classList"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-input
        v-model="query.name"
        placeholder="姓名"
        clearable
        class="header-item"
        size="mini"
      />

      <el-button
        class="header-item-btn"
        type="primary"
         :loading="scanloing"
        @click="scanClick"
         icon="el-icon-search"
        >搜索</el-button
      >
      <el-button
        v-permission="['Ai.Student.Improt']"
        class="header-item-btn"
        type="success"
        style="float:right"
        @click="improt"
        icon="el-icon-s-unfold"
        >导入</el-button
      >
    </div>
    <div class="app-full-body">
      <el-table
        :data="tableData"
        highlight-current-row
        @sort-change="onSortChange"
      >
        <el-table-column prop="name" label="姓名" sortable="custom" />
        <el-table-column prop="studentNumber" label="学号" sortable="custom" />

        <el-table-column prop="className" label="年级/班级" sortable="custom">
        <template slot-scope="scope">
           {{scope.row.gradeName+'/'+scope.row.className}}
         </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" sortable="custom" />
        <el-table-column prop="faceId" label="人脸数据" sortable="custom"> <template slot-scope="scope">
          <el-tag
              :type="formtFace(scope.row.faceId)"
              disable-transitions
              >{{ formtFace(scope.row.faceId) == 'success' ? "已上传" : "未传" }}
              </el-tag>
         </template>
        </el-table-column>
        <el-table-column prop="schoolName" label="学校" sortable="custom" />
         <el-table-column prop="cardNo" label="卡号" sortable="custom" />
          <el-table-column prop="librarycard" label="借书证号" sortable="custom" />
         <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-link   type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
            <el-popconfirm   placement="top" title="确定删除此项？" @onConfirm="del(scope.row)">
              <el-link slot="reference" type="danger" icon="el-icon-delete" @click="del(scope.row)" >删除</el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="app-full-footer">
      <pagination
        :total="pagination.totalCount"
        :page.sync="pagination.pageIndex"
        :limit.sync="query.maxResultCount"
        @pagination="onPagination"
      />
    </div>

    <ImportTemplateDialog
      :visible.sync="importDialogVisible"
      :close-confirm="true"
      dialog-width="500px"
      @close="dialogClose"
    />
    <CreateDialog
      :visible.sync="createDialogVisible"
      :close-confirm="true"
      :roles="allRoles"
      dialog-width="500px"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :user-id="editUserid"
      :close-confirm="true"
      :roles="allRoles"
      dialog-width="700px"
      @close="dialogClose"
    />
  </div>
</template>

<script>
import listMixin from "@/mixins/listMixin";
import studentApi from "@/api/student";
import userApi from '@/api/user'
import Pagination from "@/components/Pagination";
import ImportTemplateDialog from "./components/ImportTemplateDialog";
import CreateDialog from './components/StudentCreateDialog'
import EditDialog from './components/StudentEditDialog'
import schoolApi from "@/api/school";
import gradeApi from "@/api/grade";
import Cookies from "js-cookie";

export default {
  name: "Index",
  components: { Pagination, ImportTemplateDialog,CreateDialog,EditDialog },
  mixins: [listMixin],
  data() {
    return {
      importDialogVisible: false,
      createDialogVisible: false,
      editDialogVisible: false,
       editUserid: '',
      editStudentId: "",
      loading:false,
      tenantshow:false,
      scanloing:false,
      tenantId:'',
      allRoles:[],
      schoolset: "",
      schoolList: [],
      greadelset: "",
      gradelList: [],
      classSet: "",
      classList: [],
      gradequery: {
        MaxResultCoun: 1000,
        schoolId: '',
      },
      schoolquery:{
        MaxResultCoun: 1000,
      },
      query: {
        name: "",
        GradeName:"",
        ClassName:"",
        parentName: "",
        schoolName: ""
      }
    };
  },
  created() {
    this.getList();
    this.getSchoolList();
  },
  methods: {
    getList() {
      this.scanloing=true;
      studentApi.getList(this.query).then(res => {
        this.tableData = res.items;
        this.updateTotalCount(res.totalCount);
       this.scanloing=false;
      });
    },
    scanClick(){
      this.ResetpageIndex()
      this.getList()
    },
    getSchoolList() {
     this.tenantId=Cookies.get("__tenant")
       console.log(this.tenantId)
       if(this.tenantId!=undefined){
         this.gradequery.schoolId = this.tenantId;
         this.getGradeList()
         return
       }
      var parame = { maxResultCount: 1000 };
      schoolApi.getList(parame).then(res => {
        this.schoolList = res.items;
        this.tenantshow=true;
      });
    },
    getGradeList() {
      gradeApi.getListByschoolId(this.gradequery).then(res => {
        this.gradelList = res.items;
      });
    },
    formtFace(val){
      if (val!=null)
      {return 'success'}
      return 'warning'
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList();
      }
    },
    schoolSel(schoolId) {
     if (schoolId != "") {
        let school = this.schoolList.find(x => x.name== schoolId);
        this.gradequery.schoolId = school.tenantId;
         console.log( this.gradequery.schoolId);
        this.ClearGrade()
        this.getGradeList();
        this.query.schoolName = schoolId;
      } else {
        this.query.schoolName = "";
        this.ClearGrade()
       // this.gradequery.schoolId = "";
      }
      //  let school = this.schoolList.find(x => x.id == schoolId);

      this.getList();
      //  debugger;
      // this.formData.schoolId = schoolId;
      // this.formData.tenantId = school.tenantId;
    },
    edit(row) {
      this.editUserid = row.id
      this.editDialogVisible = true
    },
    del(row){
      console.log(row)
      userApi.delete(row.id);
    },
      ClearGrade(){
      this.gradelList=[]
      this.query.GradeName=''
      this.ClearClass()
    },
    GradeSet(val) {
      let grades = this.gradelList.find(x => x.name == val);
      this.ClearClass()
      this.classList = grades.classes
      console.log(this.classList)
    },
    ClearClass(){
      this.classList='',
      this.query.ClassName=''
      this.classSet=''
    },
    ClassSet(val) {
      console.log(val);
      this.query.classId=val
    },
    improt() {
      this.importDialogVisible = true;
    }
  }

};
</script>
