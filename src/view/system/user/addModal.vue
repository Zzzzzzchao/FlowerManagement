<template>
    <Modal
      v-model="flg"
      :title="modalType === 'add' ? '新增用户' : '编辑用户'"
      :closable="false"
      @on-ok="ok"
      @on-cancel="close">
      <Form :model="formData" label-position="right" :label-width="80" inline>
        <FormItem label="用户名">
          <Input v-model="formData.username" />
        </FormItem>
        <FormItem label="用户密码">
          <Input v-model="formData.password" />
        </FormItem>
        <FormItem label="昵称">
          <Input v-model="formData.showname" />
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formData.email" />
        </FormItem>
        <FormItem label="电话">
          <Input v-model="formData.phone" />
        </FormItem>
        <FormItem label="角色">
          <Input v-model="formData.phone" />
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
import { addUser, editUser } from '@/api/sysServer'
export default {
  data () {
    return {
      formData: {
        username: '', // 用户名
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
        addUser(this.formData).then((res) => {
          console.log(res)
          this.$emit('cls')
        })
      } else {
        // 编辑
        editUser(this.formData).then((res) => {
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
