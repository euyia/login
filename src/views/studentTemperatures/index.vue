<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-25 02:13:41
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">
      <el-select
       v-if="tenantshow"
        v-model="schoolset"
        clearable
        placeholder="请选择学校"
        size="mini"
        @change="schoolSel"
      >
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="query.GradeId"
        clearable
        placeholder="请选择年级"
        size="mini"
        @change="GradeSet"
      >
        <el-option
          v-for="item in gradelList"
          :key="item.index"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="classSet"
        clearable
        placeholder="请选择班级级"
        size="mini"
        @change="ClassSet"
      >
        <el-option
          v-for="item in classList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input
        v-model="query.name"
        placeholder="姓名"
        clearable
        class="header-item"
        size="mini"
      />

      <el-input
        v-model="query.type"
        placeholder="0：全部 1：正常 2：异常"
        clearable
        class="header-item"
        size="mini"
        type="number"
      />

      <el-button
        class="header-item-btn"
        type="primary"
        size="mini"
        @click="getList"
        >搜索</el-button
      >
      <el-button
        v-permission="['Ai.StudentTemperatures.Create']"
        class="header-item-btn"
        type="success"
        size="mini"
        @click="create"
        >新增</el-button
      >
    </div>
    <div class="app-full-body">
      <el-table
        :data="tableData"
        highlight-current-row
        size="mini"
        @sort-change="onSortChange"
      >
        <el-table-column prop="name" label="学生" sortable="custom" />

        <el-table-column prop="temperature" label="体温" sortable="custom" />

        <el-table-column
          prop="isAbnormal"
          label="是否异常"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.isAbnormal === 'false'"
              :type="'success'"
              disable-transitions
              >{{ scope.row.isAbnormal }}
            </el-tag>
            <el-tag
              v-else-if="scope.row.isAbnormal == 'true'"
              :type="'danger'"
              disable-transitions
              >{{ scope.row.isAbnormal }}
            </el-tag>
            <el-tag
              :type="scope.row.isAbnormal === false ? 'success' : 'warning'"
              disable-transitions
              >{{ scope.row.isAbnormal === false ? "正常" : "异常" }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="checkDateTime"
          label="体温抽查时间"
          :formatter="dateFormat"
          sortable="custom"
        />

        <el-table-column
          prop="className"
          label="年级/班级"
          :formatter="dateFormat"
          sortable="custom"
        >
         <template slot-scope="scope">
           {{scope.row.greadName+'/'+scope.row.className}}
         </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              v-permission="['Ai.Student.Update']"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
              >编辑</el-link
            >
            <el-popconfirm
              v-permission="['Ai.Student.Delete']"
              placement="top"
              title="确定删除此项？"
              @onConfirm="del(scope.row)"
            >
              <el-link slot="reference" type="danger" icon="el-icon-delete"
                >删除</el-link
              >
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
    <CreateDialog
      :visible.sync="createDialogVisible"
      :close-confirm="true"
      dialog-width="50%"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :studentTemperaturesId="editStudentTemperaturesId"
      :close-confirm="true"
      dialog-width="50%"
      @close="dialogClose"
    />
  </div>
</template>

<script>
import listMixin from "@/mixins/listMixin";
import studentTemperaturesApi from "@/api/studentTemperatures";
import Pagination from "@/components/Pagination";
import CreateDialog from "./components/StudentTemperaturesCreateDialog";
import EditDialog from "./components/StudentTemperaturesEditDialog";
import schoolApi from "@/api/school";
import gradeApi from "@/api/grade";
import Cookies from "js-cookie";

export default {
  name: "Index",
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      loading:false,
      tenantshow:false,
      schoolset: "",
      tenantId:'',
      editStudentTemperaturesId: "",
      schoolList: [],
      greadelset: "",
      gradelList: [],
      classSet: "",
      classList: [],
      gradequery: {
        MaxResultCoun: 1000,
        schoolId: '',
      },
      query: {
        schoolId: '',
        GradeId:'',
        classId:'',
        name:''
      }
    };
  },
  created() {    
    this.getSchoolList();
    this.getList();
  },
  methods: {
    getList() {
      studentTemperaturesApi.studentTemperatures(this.query).then(res => {
        this.tableData = res.items;
        this.updateTotalCount(res.totalCount);
      });
    },
    getSchoolList() {
       this.tenantId=Cookies.get("__tenant")
       console.log(this.tenantId)
       if(this.tenantId!=undefined){
         this.gradequery.schoolId = this.tenantId;
         this.getGradeList() 
         return 
       }
      var parame = { MaxResultCoun: 1000 };
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
    dialogClose(refresh) {
      if (refresh) {
        this.getList();
      }
      this.editStudentTemperaturesId = null;
    },
    create() {
      this.createDialogVisible = true;
    },
    edit(row) {
      this.editStudentTemperaturesId = row.id;
      this.editDialogVisible = true;
    },
    del(row) {
      studentTemperaturesApi.delete(row.id).then(() => {
        this.$message("删除成功");
        this.getList();
      });
    },
    schoolSel(schoolId) {
      //console.log(schoolId);
      if (schoolId != "") {
        let school = this.schoolList.find(x => x.id == schoolId);
        this.gradequery.schoolId = school.tenantId;
         console.log( this.gradequery.schoolId);
        this.ClearGrade()
        this.getGradeList();
        this.query.tenantId = school.tenantId;
      } else {
        this.query.tenantId = "";
        this.ClearGrade()
       // this.gradequery.schoolId = "";
      }
      this.getList();
    },
    ClearGrade(){
      this.gradelList=[]
      this.query.GradeId=''
      this.ClearClass()
    },  
    GradeSet(val) {
      let grades = this.gradelList.find(x => x.id == val);
      this.ClearClass()
      this.classList = grades.classes     
    },
    ClearClass(){
      this.classList='',
      this.query.classId=''
      this.classSet=''
    },
    ClassSet(val) {
      console.log(val);
      this.query.classId=val
    },
    //时间格式化
    dateFormat: function(row, column) {
      var data = row[column.property];
      if (data == undefined) {
        return "";
      }
      let dt = new Date(data);
      return (
        dt.getFullYear() +
        "-" +
        (dt.getMonth() + 1) +
        "-" +
        dt.getDate() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes() +
        ":" +
        dt.getSeconds()
      );
      // return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
