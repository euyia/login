<!--
* @description Created by AbpVueCli
* @author Xy
* @date 2020-08-07 23:27:38
* @version V1.0.0
!-->
<template>
  <section>
    <el-form
      ref="from"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="top"
      size="mini"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item prop="id" label="NFCid">
            <el-input
              v-model="formData.id"
              class="form-item"
              @focus="focus($event)"
              size="mini"
              clearable
              @keyup.enter.native="focusNextInput(0)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="books" label="书籍ISBN">
            <el-input
              v-model="formData.books.isbn"
              @focus="focus($event)"
              @keyup.enter.native="scanISBN"
              class="form-item"
              size="mini"
              clearable
            />
          </el-form-item>
        </el-col>
         <el-col :span="24">
          <el-form-item prop="thirdparty" label="第三方标签">
            <el-input
              v-model="formData.thirdparty"
              class="form-item"
              @focus="focus($event)"
              size="mini"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-col :span="24">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <span>图书信息</span>
        </div>
        <div v-for="(value, name) in formData.books">
          {{ name }}: {{ value }}
        </div>
      </el-card>
      <el-divider></el-divider>
    </el-col>

    <div class="from-footer">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
    </div>
  </section>
</template>

<script>
import fromMixin from "@/mixins/formMixin";
import nFCBookApi from "@/api/nFCBook";
import { viewModel, rules } from "./NFCBookConfig";

export default {
  name: "NFCBookCreateOrEditForm",
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    nFCBookId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      formData: Object.assign({}, viewModel),
      rules
    };
  },
  watch: {
    nFCBookId: {
      immediate: true,
      handler: function() {
        this.get();
      }
    }
  },
  methods: {
    get() {
      if (this.nFCBookId) {
        nFCBookApi.getBook(this.nFCBookId).then(res => {
          this.formData = Object.assign(this.formData, res);
        });
      } else {
        this.formData = Object.assign({}, viewModel);
      }
    },
    //得到焦点选中
    focus(event) {
      event.currentTarget.select();
    },
    focusNextInput(number) {
      console.log("Test001");
      let inputArray = document.getElementsByClassName("form-item"); //通过class去获取
      console.log(inputArray);
      let nextInput = inputArray[number + 1].childNodes;
      //去打印nextInput就会发行我们要的节点在第二个，所以去取nextInput[1]
      nextInput[1].focus();
    },
    submitForm() {
      this.$refs.from.validate(valid => {
        if (valid) {
          this.formData.bookName = this.formData.books.title;
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
    doPost() {
      this.formData.bookId = this.formData.books.id;
      this.formData.bookName = this.formData.books.title;
      return nFCBookApi.post(this.formData);
    },
    doPut() {
      return nFCBookApi.put(
        this.formData.id,
        this.formData.bookId,
        this.formData
      );
    },
    cancel() {
      this.$refs.from.resetFields();
      this.$emit("cancel");
    },
    scanISBN: function(e) {
      var val = e.target.value;
      nFCBookApi.getByIsbn(val).then(res => {
        // this.formData.books= Object.assign(this.formData.books, res)
        this.formData.books = res;
        console.log(this.formData);
      });
    }
  }
};
</script>
