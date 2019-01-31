<template>
    <Modal
      v-model="flg"
      :title="modalType === 'add' ? '新增用户' : '编辑用户'"
      :closable="false"
      @on-ok="ok"
      @on-cancel="close">
      <Form :model="formData" label-position="right" :label-width="80" inline>
        <FormItem label="角色名">
          <Input v-model="formData.role_name" />
        </FormItem>
        <FormItem label="角色菜单">
          <Input v-model="formData.password" />
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
import { addRole, editRole } from '@/api/sysServer'
export default {
  data () {
    return {
      formData: {
        role_name: '', // 角色名
        password: '', // 密码
        showname: '', // 昵称
        email: '', // 邮箱
        phone: '' // 电话
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
        addRole(this.formData).then((res) => {
          console.log(res)
          this.$emit('cls')
        })
      } else {
        // 编辑
        editRole(this.formData).then((res) => {
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
