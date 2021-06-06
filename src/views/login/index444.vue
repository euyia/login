<template>
  <!--html框体-->
  <div class="login-container">

    <!--盒子框体-->
    <div class="login_box">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <!--头部框体-->
        <div class="title-container">

          <h3 class="title">{{ tenantInfo.name }}-登录</h3>

          <lang-select class="set-language" />
        </div>
        <!--登录框体-->
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="2" auto-complete="on" />
        </el-form-item>
        <!--密码框体-->
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" tabindex="2"
            auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <!--按钮框体-->
        <el-form-item class="btns">
          <el-button :loading="loading" type="success" @click.native.prevent="handleLogin" plain>登录</el-button>
          <el-button type="info" @click="reset" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import abpTenantApi from '@/api/abpTenant'
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'Login',
  components: { LangSelect },
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {

      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      subDomain: null,
      tenantInfo: {
        name: '享阅运营平台'
      }
    }
  },
  computed: {
    //   ...mapState(['tenantname'])
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect

        const subDomain = this.tryGetSubDomainName()
        // const subDomain = 'chzx'
        if (subDomain) {
          this.subDomain = subDomain
          this.getTenantInfo()
        } else {
          Cookies.remove('__tenant')
          this.$store.state.app.tenantname = '享阅智能'
          //  Cookies.set("__tenant", '39f97d11-8e47-5c08-a4fb-9660ed7ce893', { expires: 365 });
        }
      },
      immediate: true
    }
  },
  methods: {
    // ...mapMutations(['SET_TENANTNAME']),
    reset () {
      this.$refs.loginForm.resetFields();
    },
    tryGetSubDomainName () {
      const host = window.location.host
      console.log(host)
      const adminIndex = host.indexOf('admin')
      if (adminIndex > 1) {
        return host.substring(0, adminIndex - 1)
      }

      return null
    },

    getTenantInfo () {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      abpTenantApi
        .getByDomain(this.subDomain)
        .then((res) => {
          loading.close()
          if (res.success) {
            this.tenantInfo = res
            this.$store.state.app.tenantname = res.name
            console.log(res.name)
            // this.SET_TENANTNAME(res.name)
            console.log(this.$store.state.app.tenantname)
            Cookies.set('__tenant', res.tenantId, { expires: 365 })
            //    Cookies.set("__tenant", '39f97d11-8e47-5c08-a4fb-9660ed7ce893', { expires: 365 });
            //   Cookies.set("__tenant", '39f75f0f-6203-5886-14cf-6742f3618a12', { expires: 365 });
          }
        })
        .catch(() => {
          loading.close()
        })
      // Cookies.set("__tenant", '39f73a8e-a30c-5442-8f9e-9c1cdbc8487d', { expires: 365 });
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style  lang="scss" >
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    padding: 2px;

    input {
      background: rgba(0, 0, 0, 0.12);
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .login_box {
    width: 400px;
    height: 350px;
    /* background-color: #fff; */
    background-color: #2e527bb3;
    border-radius: 5px;

    position: absolute;
    left: 70%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .rememberMe {
    color: #fff;
  }

  .el-form-item {
    border: 1px solid rgba(202, 133, 133, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .el-form-item__content {
    position: relative;
    font-size: 14px;
    display: flex;
  }
  .btns {
    border: 0px;
    line-height: 20px;
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<style lang="scss" scoped>
$bg: rgba(151, 150, 150, 0.1);
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  background-image: url('./pic/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;

  .el-form {
    padding: 32px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .el-button {
    padding: 12px;
    width: 100%;
  }
  .code {
    width: 45%;
  }

  .login-form {
    padding: 32px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  img {
    /* style="width: 100px; height: 30px; margin-left:5px;vertical-align: middle;" */

    width: 100%;
    height: 100%;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 0.1rem;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
