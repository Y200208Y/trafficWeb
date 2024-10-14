<template>
  <div id="register_container">
    <div id="register_input">
      <div id="opacity_div"></div>
      <el-form
        ref="form"
        :model="form"
        label-width="5rem"
        :hide-required-asterisk="true"
        :rules="rules"
      >
        <h3>请输入信息</h3>
        <!-- <el-form-item label="用户ID" prop="userID">
          <el-input v-model="form.userID"></el-input>
        </el-form-item> -->
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="back">返回</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bus from '@/eventBus/bus'
export default {
  data() {
    return {
      form: {
        userID: '',
        password: '',
        userName: '',
        email: '',
      },
      rules: {
        userID: [{ required: true, message: 'ID不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
      },
    }
  },
  methods: {
    register() {
      this.$api.login
        .register({
          username: this.form.userName,
          password: this.form.password,
        })
        .then((res) => {
          if (res.data.code) {
            this.$message({
              message: '注册成功',
              type: 'success',
            })
            localStorage.setItem('name',this.form.userName)
            localStorage.setItem('passward',this.form.password)
            this.$router.push('./login')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error',
            })
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: 'error',
          })
        })
    },
    back(){
      this.$router.push('./login')
    }
  },
}
</script>

<style lang="less" scoped>
#register_container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: 100% 100%;
}
#register_input {
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
  padding: 52px 50px 50px 50px;
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.227);
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
