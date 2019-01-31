<template>
    <Modal
      v-model="flg"
      title="编辑类型"
      :closable="false"
      @on-ok="ok"
      @on-cancel="close">
      <Form :model="formData" label-position="right" :label-width="80">
        <FormItem label="类型名称">
          <Input v-model="formData.name" />
        </FormItem>
        <FormItem label="类型描述">
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
import { editGoodsType } from '@/api/goodsServer'
export default {
  data () {
    return {
      formData: {
        name: '', // 类型名称
        typeId: '', // 父类ID
        remark: '' // 类型描述
      }
    }
  },
  props: {
    defaultData: '',
    flg: ''
  },
  created () {
    this.formData.typeId = this.defaultData.typeId
    this.formData.name = this.defaultData.name
    this.formData.remark = this.defaultData.remark
  },
  methods: {
    ok () {
      editGoodsType(this.formData).then((res) => {
        this.$Message.success(res.data.msg)
        this.$emit('cls', 1)
      })
    },
    close () {
      this.$emit('cls')
    }
  }
}
</script>
