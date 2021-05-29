<!--
* @description Created by AbpVueCli
* @author XyAi
* @date 2020-08-24 21:12:51
* @version V1.0.0
!-->
<template>
  <div class="app-full-container">
    <div class="app-full-header">


      <el-button  class="header-item-btn" type="success" size="mini" @click="create">新增</el-button>
    </div>
    <div class="app-full-body">
      <el-table
        :data="tableData"
        highlight-current-row
        size="mini"
        @sort-change="onSortChange"
      >
      <el-table-column
          prop="title"
          label="书名"
          sortable="custom"/>
        <el-table-column prop="pic" label="封面"  >
                 <!-- 图片的显示 -->
                 <template   slot-scope="scope">
                    <img :src="scope.row.pic"  min-width="70" height="70" />
                 </template>
      </el-table-column>

        <el-table-column
          prop="subRitle"
          label="副标题"
          sortable="custom"/>


        <el-table-column
          prop="author"
          label="作者"
          sortable="custom"/>

        <el-table-column
          prop="summary"
          label="摘要"
          sortable="custom"
          show-overflow-tooltip
        />

        <el-table-column
          prop="publisher"
          label="出版社"
          sortable="custom"/>

        <el-table-column
          prop="isbn"
          label="ISBN号"
          sortable="custom"/>
          <el-table-column
          prop="types"
          label="书籍类型"
          sortable="custom"/>

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-link   type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
            <el-popconfirm  placement="top" title="确定删除此项？" @onConfirm="del(scope.row)">
              <el-link slot="reference" type="danger" icon="el-icon-delete">删除</el-link>
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
      :bookType="bookType"
      dialog-width="60%"
      @close="dialogClose"
    />
    <EditDialog
      :visible.sync="editDialogVisible"
      :bookId="editBookId"
      :bookType="bookType"
      :close-confirm="true"
      dialog-width="60%"
      @close="dialogClose"
    />

  </div>
</template>

<script>
import listMixin from '@/mixins/listMixin'
import bookApi from '@/api/book'
import Pagination from '@/components/Pagination'
import CreateDialog from './components/BookCreateDialog'
import EditDialog from './components/BookEditDialog'
//import * as signalR from "@aspnet/signalr";

export default {
  name: 'Index',
  components: { CreateDialog, EditDialog, Pagination },
  mixins: [listMixin],
  data() {
    return {
      hubConnection: "",//signalr连接
      createDialogVisible: false,
      editDialogVisible: false,
      editBookId: '',
      bookType: [],
      query: {

      }
    }
  },
  created() {
  // let thisVue = this;
  // thisVue.hubConnection = new signalR.HubConnectionBuilder()
  //   .withUrl(`${process.env.VUE_APP_BASE_API}/signalr-hubs/Chatting`)
  //   // .withAutomaticReconnect()
  //   .configureLogging(signalR.LogLevel.Information)
  //   .build();
  //   start();
  //   async function start() {
  //   try {
  //     await thisVue.hubConnection.start();
  //     console.log("connected");
  //   } catch (err) {
  //     console.log(err);
  //     setTimeout(() => start(), 5000);
  //   }
  //   thisVue.hubConnection.on("signalrTest", function(update) {
  //   console.info("update success!");
  //   thisVue.name = update;
  //   //  thisVue.tableData = update;//将返回的数据，实时的赋值给当前页面的 data 中；
  //    }),
  //   thisVue.hubConnection.onclose(async () => {
  //     await start();
  //   }),
  //   thisVue.hubConnection.on("bookcaserstatus", function(update) {
  //   console.info("update success!");
  //   thisVue.tableData = update; //将返回的数据，实时的赋值给当前页面的 data 中；
  //    })
  //  }

    this.getBooktype()
    this.getList()

    },
  methods: {
    getBooktype() {
      bookApi.getBookTypeList().then(res => {
        this.bookType = Object.assign(this.bookType, res)
        console.log(this.bookType)
      })
    },
    getList() {
      bookApi.getList(this.query).then(res => {
        this.tableData = res.items
       this.tableData.forEach(function(item){
         item.pic=process.env.VUE_APP_BASE_API+"/images/BookThumb/"+item.pic+"?" + Math.random();
       })
       console.log(this.tableData)
        this.updateTotalCount(res.totalCount)
      })
    },
    getimage(val){
      return process.env.VUE_APP_BASE_API+"/images/BookThumb/"+val+"?"
    },
    dialogClose(refresh) {
      if (refresh) {
        this.getList()
      }
      this.editBookId = null
    },
    create() {
      this.createDialogVisible = true
    },
    edit(row) {
       console.log(this.bookType)
      this.editBookId = row.id
      this.editDialogVisible = true
    },
    del(row) {
      bookApi.delete(row.id).then(() => {
        this.$message('删除成功')
        this.getList()
      })
    }
  }
}
</script>
