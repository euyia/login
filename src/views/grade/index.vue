<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-10 20:10:51
* @version V1.0.0
!-->
<template>
  <div>
    <el-row class="layout-container" :gutter="5">
      <el-col style="height:100%" :span="4">
        <div class="layout-box" style="height:100%">
          <el-row class="layout-header border">
            <el-button v-permission="['Ai.Grade.Create']" class="header-item-btn" type="success" size="mini" icon="el-icon-plus" @click="create" />
          </el-row>
          <el-row style="padding-top:5px">
            <div
              v-for="(item, index) in tableDataGrade"
              :key="index"
              :class="{active: query.gradeId === item.id}"
              class="group-item"
              @click="query.gradeId = item.id"
            >
              <span class="text">{{ item.name }}</span>
              <span v-permission="['Ai.Grade.Update']" class="icon el-icon-s-tools" @click="edit(item)" />
            </div>
          </el-row>
        </div>
      </el-col>
      <el-col style="height:100%" :span="20">
        <div class="layout-box" style="height:100%">
          <el-row class="layout-header">
            <el-button class="header-item-btn" type="success" size="mini" @click="createClass">新增</el-button>
          </el-row>
          <el-row style="height:calc(100vh - 100px)">
            <div class="layout-table-container">
              <div class="table">
                <el-table
                  :max-height="'100%'"
                  :height="'100%'"
                  :data="tableDataClass"
                  highlight-current-row
                  border
                  size="mini"
                  @sort-change="onSortChange"
                >
                  <el-table-column
                    prop="name"
                    label="名称"
                    sortable="custom"
                  />
                  <el-table-column
                    prop="desc"
                    label="描述"
                    sortable="custom"
                  />
                  <el-table-column
                    label="操作"
                  >
                    <template slot-scope="scope">
                      <el-link v-permission="['Ai.Class.Update']" type="primary" icon="el-icon-edit" @click="editClass(scope.row)">编辑</el-link>
                      <el-popconfirm v-permission="['Ai.Class.Delete']" placement="top" title="确定删除此项？" @onConfirm="delClass(scope.row)">
                        <el-link slot="reference" type="danger" icon="el-icon-delete">删除</el-link>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination">
                <pagination
                  :total="pagination.totalCount"
                  :page.sync="pagination.pageIndex"
                  :limit.sync="query.maxResultCount"
                  @pagination="onPagination"
                />
              </div>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <GradeCreateDialog
      :visible.sync="createGradeDialogVisible"
      :close-confirm="true"
      dialog-width="500px"
      @close="dialogClose"
    />
    <GradeEditDialog
      :visible.sync="editGradeDialogVisible"
      :grade-id="editGradeId"
      :close-confirm="true"
      dialog-width="500px"
      @close="dialogClose"
    />
    <ClassCreateDialog
      :visible.sync="createClassDialogVisible"
      :close-confirm="true"
      :grade-id="query.gradeId"
      dialog-width="500px"
      @close="dialogCloseClass"
    />
    <ClassEditDialog
      :visible.sync="editClassDialogVisible"
      :class-id="editClassId"
      :close-confirm="true"
      dialog-width="500px"
      @close="dialogCloseClass"
    />
  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import gradeApi from '@/api/grade'
import classApi from '@/api/class'
import Pagination from '@/components/Pagination'
import GradeCreateDialog from './components/GradeCreateDialog'
import GradeEditDialog from './components/GradeEditDialog'
import ClassCreateDialog from './components/ClassCreateDialog'
import ClassEditDialog from './components/ClassEditDialog'

export default {
  name: 'Index',
  components: { GradeCreateDialog, GradeEditDialog, ClassCreateDialog, ClassEditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      tableDataGrade: null,
      tableDataClass: null,
      createGradeDialogVisible: false,
      editGradeDialogVisible: false,
      createClassDialogVisible: false,
      editClassDialogVisible: false,
      editGradeId: '',
      editClassId: '',
      query: {
        gradeId: null
      }
    }
  },
  watch: {
    'query.gradeId': function(val) {
      this.getList()
    }
  },
  created() {
    this.getList(true)
  },
  methods: {
    async getList(refresh) {
      if (refresh) {
        const gradeData = await gradeApi.getList({
          maxResultCount: 1000
        })
        this.tableDataGrade = gradeData.items
        if (gradeData.items.length) {
          this.query.gradeId = gradeData.items[0].id
        }
      }

      classApi.getList(this.query).then(res => {
        this.tableDataClass = res.items
        this.updateTotalCount(res.totalCount)
      })
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList(true)
      }
      this.editGradeId = null
    },
    dialogCloseClass(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editClassId = null
    },
    create() {
      this.createGradeDialogVisible = true
    },
    edit(row) {
      this.editGradeId = row.id
      this.editGradeDialogVisible = true
    },
    del(row) {
      gradeApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList(true)
      })
    },
    createClass() {
      this.createClassDialogVisible = true
    },
    editClass(row) {
      this.editClassId = row.id
      this.editClassDialogVisible = true
    },
    delClass(row) {
      classApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .border{
    border-bottom: 1px solid #ebeef5;
  }
  .layout-container{
    background: #e9eef2;
    padding: 5px;
    height: calc(100vh - 50px);

    .layout-box{
      padding: 5px;
      background: white;
      border-radius: 5px;
    }

    .layout-header{
      padding-bottom: 5px;
      height: 35px;
    }

    .layout-table-container{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .table{
        flex: 1;
        overflow: hidden;
      }

      .pagination{
        height: 40px;
        padding: 5px 0;
      }
    }
  }

  .group-item {
        border-left: solid 4px transparent;
        background: #f4f6f7;
        font-size: 12px;
        margin-bottom: 1px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        color: #333;
        display: flex;
        align-items: center;
        &.active {
            background: #d4d4d4;
            border-left-color: #409eff;
        }
        .text{
            flex: 1;
            padding: 10px;
        }
        .icon{
            font-size: 18px;
            color: #aaa;
            padding: 10px;
        }
    }
</style>
