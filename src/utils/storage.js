
// eslint-disable-next-line camelcase
const user_info_key = 'user_info_key'
const HISTORY_KEY = 'hm_history_list'

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

export const getHistorySearch = () => {
  const value = localStorage.getItem(HISTORY_KEY)
  return value
    ? JSON.parse(value)
    : []
}

export const setHistorySearch = (value) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(value))
}
