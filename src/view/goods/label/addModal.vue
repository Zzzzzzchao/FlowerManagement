<template>
    <Modal
      v-model="flg"
      :title="modalType === 'add' ? '新增标签' : '编辑标签'"
      :closable="false"
      @on-ok="ok"
      @on-cancel="close">
      <Form :model="formData" ref='formRef' :rules="ruleValidate" label-position="right" :label-width="80" inline>
        <FormItem label="标签名称" prop='markName'>
          <Input v-model="formData.markName" />
        </FormItem>
        <FormItem label="标签描述" prop='remark'>
          <Input v-model="formData.remark" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="$emit('cls')">取消</Button>
        <Button @click="ok" type="primary">确定</Button>
        <div></div>
      </div>
  </Modal>
</template>
<script>
import { addGoodsMark, editGoodsMark } from '@/api/goodsServer'
export default {
  data () {
    return {
      formData: {
        markName: '', // 标签名称
        remark: '' // 标签描述
      },
      ruleValidate: {
        markName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    modalType: {
      type: String
    },
    flg: {
      type: Boolean
    },
    defaultData: ''
  },
  created () {
    this.formData.markName = this.defaultData.markName || ''
    this.formData.remark = this.defaultData.remark || ''
  },
  methods: {
    ok () {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (this.modalType === 'add') {
            // 新增
            addGoodsMark(this.formData).then((res) => {
              this.$Message.success(res.data.msg)
              this.$emit('cls', 1)
            })
          } else {
            // 编辑
            editGoodsMark(this.formData).then((res) => {
              this.$Message.success(res.data.msg)
              this.$emit('cls', 1)
            })
          }
        }
      })
    },
    close () {
      this.$emit('cls')
    }
  }
}
</script>
