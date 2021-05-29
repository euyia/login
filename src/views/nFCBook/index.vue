<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 23:27:38
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
        @change="schoolSel"
      >
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.name"          
          :value="item.tenantId"
        ></el-option>
      </el-select>

      <el-input
        v-model="query.NfcId"
        placeholder="输入NFCID"
        clearable
        class="header-item"
        size="mini"
      />
      <el-button
        class="header-item-btn"
        type="primary"
        size="mini"
        icon="el-icon-search" 
        @click="scanClick"
        >搜索</el-button
      >
      <el-button
        class="header-item-btn"
        type="success"
        size="mini"
        icon="el-icon-circle-plus-outline" 
         style="float:right"
        @click="create"
        >新增</el-button>
        <el-button
        class="header-item-btn"
        type="success"
        size="mini"
        icon="el-icon-s-unfold" 
         style="float:right"
        @click="improt"
        >批量导入</el-button>
    </div>
    <div class="app-full-body">
      <el-table
        :data="tableData"
        highlight-current-row
        @sort-change="onSortChange"
      >
        <el-table-column prop="id" label="Nfcid" sortable="custom" />
        <el-table-column prop="bookName" label="书名" sortable="custom" />
        <el-table-column prop="caseInfoId" label="格子ID" sortable="custom" />
        <el-table-column prop="state" label="状态" sortable="custom">
          <template slot-scope="scope">
            <el-tag :type="formatstateTyep(scope.row.state)">
              {{ formatstate(scope.row.state) }}</el-tag
            >
          </template>
        </el-table-column>
         <el-table-column prop="thirdparty" label="第三方标签" sortable="custom" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" icon="el-icon-edit" @click="edit(scope.row)"
              >编辑</el-link
            >
            <el-popconfirm
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
      :nFCBookId="editNFCBookId"
      :close-confirm="true"
      dialog-width="50%"
      @close="dialogClose"
    />
    <ImportTemplateDialog
      :visible.sync="importDialogVisible"
      :close-confirm="true"
      dialog-width="500px"
      @close="dialogClose"
    />
  </div>
</template>

<script>
import listMixin from "@/mixins/listMixin";
import nFCBookApi from "@/api/nFCBook";
import Pagination from "@/components/Pagination";
import CreateDialog from "./components/NFCBookCreateDialog";
import EditDialog from "./components/NFCBookEditDialog";
import ImportTemplateDialog from "./components/ImportTemplateDialog";
import schoolApi from "@/api/school";

export default {
  name: "Index",
  components: { CreateDialog, EditDialog, Pagination,ImportTemplateDialog },
  mixins: [listMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      editNFCBookId: "",
      importDialogVisible:false,
      tenantshow: false,
      schoolset: "",
      schoolList: [],
      query: {
        TenantId: "",
        NfcId: ""
      }
    };
  },
  created() {
    this.getList();
    this.getSchoolList();
  },
  methods: {
    getList() {
      nFCBookApi.GetNfcbookListAsync(this.query).then(res => {
        this.tableData = res.items;
        this.updateTotalCount(res.totalCount);
      });
    },
    getSchoolList() {
      this.tenantId = Cookies.get("__tenant");
      if (this.tenantId != undefined) {
        var parame = { MaxResultCoun: 1000 };
        schoolApi.getList(parame).then(res => {
          console.log(res);
          // this.schoolList=Object.assign(this.schoolList,res.items);
          this.schoolList = res.items;
          this.tenantshow = true;
          console.log(this.schoolList);
        });
      }
    },
    formatstateTyep(value) {
      if (value == 0) {
        return "primary";
      }
      if (value == 1) {
        return "success";
      }
      if (value == 2) {
        return "warning";
      }
    },
    formatstate(value) {
      if (value == 0) {
        return "在仓库";
      }
      if (value == 1) {
        return "在柜子";
      }
      if (value == 2) {
        return "已借出";
      }
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList();
      }
      this.editNFCBookId = null;
    },
    create() {
      this.createDialogVisible = true;
    },
    edit(row) {
      this.editNFCBookId = row.id;
      this.editDialogVisible = true;
    },
    del(row) {
      nFCBookApi.delete(row.id).then(() => {
        this.$message("删除成功");
        this.getList();
      });
    },
    scanClick(){
      if(this.query.NfcId.length>0){
        this.getList() 
      }
    },
    schoolSel(schoolId) {
      // console.log(schoolId)
      this.query.TenantId = schoolId;
      this.getList();
    },
    improt() {
      console.log("open")
      this.importDialogVisible = true;
    }
  }
};
</script>
