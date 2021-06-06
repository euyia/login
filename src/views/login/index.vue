<template>
  <div class="login-container">
     <!--标题区-->
     <div class="title-container">

          <span class="title">{{ tenantInfo.name }}</span>
          <span>自古圣贤，盛德大业，未有不由学而成者也。 </span>

          <lang-select class="set-language" />
        </div>
    <!-- 盒子 -->
    <div class="login_box">
      <!-- 登录区 包括title -->
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
     
<!--用户名区  -->
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
<!-- 密码区 -->
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <!-- 登录按钮区 -->
       <!--   <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;margin-top:60px;"
          @click.native.prevent="handleLogin"
        >登录</el-button>-->
           <button  class="styled-button" :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;margin-top:60px;"
          @click.native.prevent="handleLogin" >
                        <span class="styled-button__real-text-holder">
                            <span class="styled-button__real-text">
                                登录
                            </span>
                            <span class="styled-button__moving-block face">
                                <span class="styled-button__text-holder">
                                    <span class="styled-button__text">
                                        登录
                                    </span>
                                </span>
                            </span>
                            <span class="styled-button__moving-block back">
                                <span class="styled-button__text-holder">
                                    <span class="styled-button__text">
                                       登录
                                    </span>
                                </span>
                            </span>
                        </span>
                    </button>
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
  data() {
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
      handler: function(route) {
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
    tryGetSubDomainName() {
      const host = window.location.host
      console.log(host)
      const adminIndex = host.indexOf('admin')
      if (adminIndex > 1) {
        return host.substring(0, adminIndex - 1)
      }

      return null
    },

    getTenantInfo() {
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:transparent;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .title-container{
    width: 400px;
    /* height:350px这个高度注释掉就可以？ */
    display:flex;
    flex-direction: column;
    position: absolute;
    left: 32%;
    top: 38%;
    transform: translate(-50%, -50%);
   
   span{
     font-size: 35px;
     color: #666;
     font-family: "Microsoft YaHei" ;
   }
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 47px;
      caret-color: black;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
        /*  99999s 基本上就是一个无限长的时间 
    通过延长增加自动填充背景色的方式, 是用户感受不到样式的变化*/ 

input:-webkit-autofill,/* --------------找样式最简单的方式就是检查！！--------------------*/
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    }
  }

  .login_box {/* 盒子区域 */
    width: 400px;
    height: 350px;
    /* background-color: #fff; */
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);

    position: absolute;
    left: 65%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  .rememberMe {/* 这个是什么。。？？ */
    color: rgb(63, 11, 11);
  }

  .el-form-item {/* 这个就是设置输入框的背景颜色 */
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(232, 240, 254);/* 锁以内的 */
    border-radius: 5px;
    color: black;
  }
  .el-form-item:focus-within{
    border: 1px solid rgb(102, 177, 255) !important;
    background-color: #fff;



  }
  .el-button:hover{
   box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);/* 那个高光到底在哪里设定的。？？ */
 
  }
}
</style>

<style lang="scss" scoped>
$bg: #666;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-color: rgb(240, 242, 245);/* 这是全背景颜色 */
  /*background-image: url("../images/bg_login.png");*/
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

  .styled-button {
  -webkit-appearance: none;
  -webkit-user-select: none;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  padding: 20px;
  outline: none;
  background: none;
  position: relative;
  color: #fff;
  border-radius: 3px;
  margin-bottom: 25px;
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: #1877f2;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  overflow: hidden;
}
.styled-button__real-text-holder {
  position: relative;
}
.styled-button__real-text {
  color: transparent;
  display: inline-block;
}
.styled-button__text-holder {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.styled-button__moving-block {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.styled-button__moving-block.back {
  color: black;
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
}
.styled-button__moving-block.back .styled-button__text-holder {
  -webkit-transform: translateX(100%);
          transform: translateX(100%);
}
.styled-button:hover,
.styled-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: #1877f2;
}
.styled-button:hover .face,
.styled-button:active .face {
  -webkit-transform: translateX(100%);
          transform: translateX(100%);
}
.styled-button:hover .face .styled-button__text-holder,
.styled-button:active .face .styled-button__text-holder {
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
}
.styled-button:hover .back,
.styled-button:active .back {
  -webkit-transform: translateX(0);
          transform: translateX(0);
}
.styled-button:hover .back .styled-button__text-holder,
.styled-button:active .back .styled-button__text-holder {
  -webkit-transform: translateX(0);
          transform: translateX(0);
}
.styled-button:active {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.styled-input {
  width: 100%;
  position: relative;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.styled-input__circle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  border-radius: 3px;
}
.styled-input__circle:after {
  content: '';
  position: absolute;
  left: 16.5px;
  top: 19px;
  height: 14px;
  width: 14px;
  z-index: -2;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0);
  -webkit-transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: transform 0.6s ease, opacity 1s ease;
  transition: transform 0.6s ease, opacity 1s ease, -webkit-transform 0.6s ease;
}
.styled-input__input {
  width: 100%;
  -webkit-appearance: none;
  font-size: 14px;
  outline: none;
  background: none;
  padding: 18px 15px;
  color: #fff;/* 这个。。。怎么设置都没区别 */
  border: none;
  font-weight: 600;
  letter-spacing: 0.035em;
}
.styled-input__placeholder {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  z-index: -1;
  padding-left: 45px;
  color: white;/* 放上去之后的颜色 */
}
.styled-input__placeholder-text {
  -webkit-perspective: 500px;
          perspective: 500px;
  display: inline-block;
}
.styled-input__placeholder-text .letter {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  -webkit-animation: letterAnimOut 0.25s ease forwards;
          animation: letterAnimOut 0.25s ease forwards;
  text-shadow: 0 0 5px;
}
.styled-input__placeholder-text .letter.active {
  -webkit-animation: letterAnimIn 0.25s ease forwards;
          animation: letterAnimIn 0.25s ease forwards;
}
.styled-input:hover {
  border-color: rgba(255, 255, 255, 0.4);
}
.styled-input.filled {
  border-color: rgba(255, 255, 255, 0.2);
}
.styled-input.filled .styled-input__circle:after {
  -webkit-transform: scale(37);
          transform: scale(37);
  opacity: 0;
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
    color:black;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #666;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  img {
    /* style="width: 100px; height: 30px; margin-left:5px;vertical-align: middle;" */
    display: line-inline;
    width: 45%;
    height: 28px;
    margin-left: 10px;
    vertical-align: middle;
    border-radius: 3px;
  }

  .title-container {
    position: relative;

    .title {
   
      font-size: 40px;
      color: rgb(22, 111, 229);
      margin: 0px auto 40px auto;
    
      font-weight: 900;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: black;
    cursor: pointer;
    user-select: none;
  }
}
</style>
