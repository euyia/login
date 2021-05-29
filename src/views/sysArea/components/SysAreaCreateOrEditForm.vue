<!--
* @description Created by AbpVueCli
* @author 赵坤
* @date 2020-08-05 21:02:19
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
          <el-form-item
            prop="parentId"
            label="上级"
          >
            <el-popover
              width="500"
              trigger="click"
            >
              <CommonTreeSelector
                node-key="value"
                :expand-all="false"
                :default-checked-keys="[formData.parentId]"
                :default-expanded-keys="[formData.parentId]"
                :data="treeData"
                :height="300"
                @checkChange="onCheckChange"
              />
              <el-input slot="reference" v-model="formData.parentName" class="form-item" size="mini" readonly />
            </el-popover>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="code"
            label="编码"
          >
            <el-input v-model="formData.code" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="name"
            label="名称"
          >
            <el-input v-model="formData.name" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="desc"
            label="描述"
          >
            <el-input v-model="formData.desc" class="form-item" size="mini" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="type"
            label="类型"
          >
            <el-select v-model="formData.type" class="form-item" placeholder="请选择">
              <el-option
                v-for="item in sysAreaTypeEnum"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="sort"
            label="排序"
          >
            <el-input v-model="formData.sort" class="form-item" size="mini" type="number" clearable />
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
import fromMixin from '@/mixins/formMixin'
import sysAreaApi from '@/api/sysArea'
import { viewModel, rules, sysAreaTypeEnum } from './SysAreaConfig'

import CommonTreeSelector from '@/components/CommonTreeSelector'

export default {
  name: 'SysAreaCreateOrEditForm',
  components: {
    CommonTreeSelector
  },
  mixins: [fromMixin],
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    sysAreaId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: Object.assign({ }, viewModel),
      rules,
      sysAreaTypeEnum,
      treeData: []
    }
  },
  watch: {
    sysAreaId: {
      immediate: true,
      handler: function() {
        this.get()
      }
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    get() {
      if (this.sysAreaId) {
        sysAreaApi.get(this.sysAreaId).then(res => {
          this.formData = Object.assign(this.formData, res)
        })
      }
    },
    getTree() {
      sysAreaApi.getTree().then(res => {
        this.treeData = res
      })
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
      return sysAreaApi.post(this.formData)
    },
    doPut() {
      return sysAreaApi.put(this.sysAreaId, this.formData)
    },
    cancel() {
      this.$refs.from.resetFields()
      this.$emit('cancel')
    },
    onCheckChange(nodes) {
      if (nodes.length === 0) {
        this.formData.parentId = null
        this.formData.parentName = null
      } else {
        if (nodes[0].value === this.formData.id) {
          this.$message({
            message: '不能选择自己作为上级菜单',
            type: 'warning'
          })
          return
        }
        this.formData.parentId = nodes[0].value
        this.formData.parentName = nodes[0].label
      }
    }
  }
}
</script>
