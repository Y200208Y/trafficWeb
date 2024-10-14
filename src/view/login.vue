<template>
  <div id="login_container">
    <div id="login_input">
      <el-form
        ref="form"
        :model="form"
        label-width="5rem"
        :hide-required-asterisk="true"
        :rules="rules"
      >
        <h3>欢迎使用</h3>
        <el-form-item label="用户名" prop="uid">
          <el-input v-model="form.uid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login_index">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
      <div id="opacity_div"></div>
    </div>
  </div>
</template>

<script>
import bus from '@/eventBus/bus'
export default {
  data() {
    return {
      form: {
        uid: '',
        password: '',
      },
      rules: {
        uid: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
      },
    }
  },
  methods: {
    login_index() {
      this.$api.login
        .login({
          username: this.form.uid,
          password: this.form.password,
        })
        .then((res) => {
          console.log(res.data.code)
          console.log(this.form.uid,this.form.password)
          if (res.data.code) {
            this.$router.replace('./index')
            this.$message({
              message: res.data.data,
              type: 'success',
            })
            localStorage.clear()
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: 'error',
          })
        })
    },
    register() {
      this.$router.push('./register')
    },
  },
  mounted(){
      this.form.uid=localStorage.getItem('name')
      this.form.password=localStorage.getItem('passward')
  }
}
</script>

<style lang="less" scoped>
#login_container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: 100% 100%;
}
#login_input {
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.22), 0 0 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}
#opacity_div {
  width: 18.75rem;
  background: green;
  opacity: 0;
}
/deep/.el-form {
  background: rgba(255, 255, 255, 0.696);
  padding: 3.25rem 3.125rem 6.25rem 3.125rem;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.227);
}
/deep/.el-form-item {
  margin: 1.25rem 0.625rem 1.25rem 0;
}
/deep/.el-button {
  margin: 0 1.875rem 0 1.875rem;
}
/deep/.el-form-item__label {
  color: black;
}
</style>
