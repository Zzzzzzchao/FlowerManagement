<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎使用花应商城管理系统" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { loginReq } from '@/api/common'
export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit ({ userName, password }) {
      console.log('测试')
      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     this.$router.push({
      //       name: this.$config.homeName
      //     })
      //   })
      // })
      let data = {
        username: userName,
        password: password
      }
      console.log(data)
      loginReq(data).then((res) => {
        if (res.data.code === 1) {
          this.$router.push('/home')
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
