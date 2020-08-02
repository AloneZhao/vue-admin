import { Login } from '@/api/login'
import {
  set_Token,
  set_Username,
  get_Username,
  remove_Token,
  remove_Username
} from '@/utils/storage'

const state = {
  // 定义导航栏的展开与收起状态
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  to_Ken: '',
  userName: get_Username() || ''
}

const getters = {
  isCollapse(state) {
    return state.isCollapse
  },
  userName(state) {
    return state.userName
  }
}

const mutations = {
  // 定义改变isCollapse状态值
  setIsCollapse(state) {
    state.isCollapse = !state.isCollapse
    // h5 本地存储
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  // 在状态仓库中改变toke值 同时退出登陆后清除 store 中的值
  setToken(state, value) {
    state.to_Ken = value
  },
  // 在状态仓库中改变username值
  setUserName(state, value) {
    state.userName = value
  }
}

// 回调处理业务
const actions = {
  // 登陆
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData)
        .then(response => {
          let { data } = response
          // 将返回的 token 存到仓库中
          content.commit('setToken', data.toKen)
          content.commit('setUserName', data.username)

          // 将返回的 token 存到 cookie 中
          set_Token(data.token)
          // 将返回的 user 存到 cookie
          set_Username(data.username)

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 退出
  exit(content) {
    return new Promise(resolve => {
      remove_Token()
      remove_Username()
      content.commit('setToken', '')
      content.commit('setUserName', '')
      resolve()
    })
  }
}

const modules = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules
}
