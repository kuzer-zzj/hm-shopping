
// eslint-disable-next-line camelcase
const user_info_key = 'user_info_key'

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(user_info_key)
  return userInfo
    ? JSON.parse(userInfo)
    : {
        token: '',
        userId: ''
      }
}

export const setUserInfo = (info) => {
  localStorage.setItem(user_info_key, JSON.stringify(info))
}

export const delUserInfo = () => {
  localStorage.removeItem(user_info_key)
}
