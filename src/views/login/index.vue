<template>
  <div id="login-container">
    <a-spin class="spin" tip="请稍等..." :spinning="spinning"></a-spin>
    <!-- 毛玻璃遮罩层 -->
    <div class="shield animate__animated animate__fadeIn">
      <span>登&emsp;&emsp;录</span>
    </div>
    <!-- 表单 -->
    <a-form-model
      class="login-form animate__animated animate__zoomInDown"
      ref="loginForm"
      :rules="rules"
      :model="loginForm"
    >
      <a-form-model-item prop="username">
        <a-input v-model="loginForm.username" placeholder="Username">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input-password
          v-model="loginForm.password"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-model-item>
      <template>
        <a-form-model-item prop="code" hasFeedback :style="{ display: 'inline-block',width: 'calc(50% - 12px)',marginRight:'24px'}">
          <a-input v-model="loginForm.code" :max-length="4" placeholder="验证码" autocomplete="off" />
        </a-form-model-item>
        <!-- 验证码 -->
        <!-- <span @change="changeCode">
          <svg-icon style="font-size:1.2rem;margin-bottom: 7px;margin-right: 7px;" icon-class="refresh"></svg-icon>
        </span> -->
        <s-identify :style="{marginTop:'4px',width: 'calc(50% - 12px)'}" ref="ref_validateCode" @change="changeCode"/>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          @click="handleSubmit('loginForm')"
        >
          Log in
        </a-button>
      </template>
    </a-form-model>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import SIdentify from './components/identify.vue'
export default {
  beforeCreate () {},
  mounted () {
  },
  components: {
    SIdentify
  },
  data () {
    // 定义校验规则
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于六位数'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value.toLowerCase() === this.identifyCode.toLowerCase()) { // 不区分大小写
        callback()
      } else {
        callback(new Error('验证码错误'))
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        code: '' // 用户输入验证码
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        code: [{ validator: validateCode, trigger: 'change' }]
      },
      spinning: false, // 加载中
      identifyCode: '', // 验证码
      redirect: undefined
      // formItemLayout: {
      //   labelCol: { span: 4 },
      //   wrapperCol: { span: 20 }
      // }
      // loginRules: {
      //   remember: {
      //     valuePropName: 'checked',
      //     initialValue: true
      //   }
      // }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        console.log(route)
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // message.success('submit!')
          this.spinning = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.spinning = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.spinning = false
          })
        } else {
          message.error('error submit!!!')
          return false
        }
      })
    },
    changeCode (value) {
      this.identifyCode = value
      this.loginForm.code = value
    }
  }
}
</script>

<style lang="scss" scope>
#login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../assets/wallhaven.png);
  background-position: center top;
  background-size: cover;
  z-index: -1;
  .spin{
    width: 30rem;
    height: 20rem;
    position: absolute;
    z-index: 99;
  }
  // 毛玻璃
  .shield {
    width: 30rem;
    height: 20rem;
    position: absolute;
    z-index: 1;
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation-delay: 1.5s;
    animation-duration: 4s;
    padding-top: 1rem;
    text-align: center;
    font-size: 24px;
    color: whitesmoke;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-filter: blur(20px);
      -moz-filter: blur(20px);
      -ms-filter: blur(20px);
      -o-filter: blur(20px);
      filter: blur(20px);
      z-index: -3;
      margin: -30px;
      background-image: url(../../assets/wallhaven.png);
      background-position: center top;
      background-size: cover;
      background-attachment: fixed;
    }
  }
  // 表单
  .login-form {
    min-width: 20rem;
    width: 20rem;
    position: relative;
    padding-top: 3rem;
    z-index: 2;
    animation-duration: 3s;
    .login-form-button {
      width: 100%;
    }
  }
  .one{
    display: flex;
  }
}
</style>
