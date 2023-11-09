import request from '@/utils/request'

export const getCodeReq = () => {
  return request.get('/captcha/image')
}

export const sendMsgCodeReq = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {

      captchaCode,

      captchaKey,

      mobile
    }
  })
}

export const loginReq = (smsCode, mobile) => {
  return request.post('/passport/login', {
    form: {

      smsCode,

      mobile,

      isParty: false,
      partyData: {}
    }
  })
}
