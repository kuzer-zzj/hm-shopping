<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
            v-model="phone"
          />
        </div>
        <div class="form-item">
          <input
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
            v-model="picCode"
          />
          <img v-if="codeData" :src="codeData" alt="" @click="getCode" />
        </div>
        <div class="form-item">
          <input
            v-model="msgCode"
            class="inp"
            placeholder="请输入短信验证码"
            type="text"
          />
          <button @click="sendMsgCode">
            {{
              totalSeconde == second ? "获取验证码" : second + "秒后重新发送"
            }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getCodeReq, sendMsgCodeReq, loginReq } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      codeData: '',
      codeKey: '',
      totalSeconde: 5,
      second: 5,
      timer: null,
      phone: '',
      picCode: '',
      msgCode: ''
    }
  },
  async created () {
    this.getCode()
  },
  methods: {
    // 获取验证码
    async getCode () {
      const data = await getCodeReq()
      console.log(data)
      this.codeData = data.data.base64
      this.codeKey = data.data.key
    },
    async  sendMsgCode () {
      // totalSeconde 不等于 second 不能发送短信
      if (this.totalSeconde !== this.second) {
        this.$toast('请稍后再试！')
        return
      }

      if (this.phone.length !== 11) {
        this.$toast('手机号错误！')
        return
      }
      // 校验 picCode 要求4位字符
      if (this.picCode.length !== 4) {
        this.$toast('请输入正确图形验证码')
        return
      }
      const data = await sendMsgCodeReq(this.picCode, this.codeKey, this.phone)
      console.log(data)
      this.$toast('验证码发送成功', data)
      this.timer = setInterval(() => {
        this.second--
        console.log('定时器...', this.second, this.totalSeconde)
        if (this.second <= 0) {
          clearInterval(this.timer)
          this.time = null
          this.second = this.totalSeconde
        }
      }, 1000)
    },
    async  login () {
      const data = await loginReq(this.msgCode, this.phone)
      const userInfo = data.data

      console.log(data)
      this.$toast('登录成功')
      // 保存用户登录信息到story中的user 模块
      this.$store.commit('user/setUserInfo', userInfo)
      // 跳转到首页
      const path = this.$route.query.backUrl || '/'
      this.$router.replace(path)
    }
  },

  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
