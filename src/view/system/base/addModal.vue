<template>
    <Modal
      v-model="flg"
      :title="modalType === 'add' ? '新增用户' : '编辑用户'"
      :closable="false"
      @on-ok="ok"
      @on-cancel="close">
      <Form :model="formData" label-position="right" :label-width="80" inline>
        <FormItem label="类型">
          <Input v-model="formData.name" />
        </FormItem>
        <FormItem label="名称">
          <Input v-model="formData.status" />
        </FormItem>
        <FormItem label="状态">
          <Input v-model="formData.type" />
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
import { addBase, editBase } from '@/api/sysServer'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        status: '', // 密码
        type: '' // 昵称
      }
    }
  },
  props: {
    modalType: {
      type: String
    },
    flg: {
      type: Boolean
    }
  },
  methods: {
    ok () {
      if (this.modalType === 'add') {
        // 新增
        addBase(this.formData).then((res) => {
          console.log(res)
          this.$emit('cls')
        })
      } else {
        // 编辑
        editBase(this.formData).then((res) => {
          console.log(res)
          this.$emit('cls')
        })
      }
    },
    close () {
      this.$emit('cls')
    }
  }
}
</script>
