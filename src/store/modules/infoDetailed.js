const state = {
  /**
   * 已经存储了值，不刷新页面，值一直存在vuex
   * 刷新页面后，就会去session中取并赋给变量
   */
  id: "" || sessionStorage.getItem("infoId"),
  title: "" || sessionStorage.getItem("infoTitle")
};

const getters = {
  infoId(state) {
    return state.id;
  },
  infoTitle(state) {
    return state.title;
  }
};

const mutations = {
  /**
   * 利用json对象循环，定义一个方法修改satate中的所有值
   * @param {*} state
   * @param {*} params
   */
  _SetState(state, params) {
    for (const key in params) {
      state[key] = params[key].value;
      if (params[key].session) {
        sessionStorage.setItem(params[key].name, params[key].value);
      }
    }
  }
  // _setId(state, value) {
  //   state.id = value;
  //   sessionStorage.setItem("infoId", value);
  // },
  // _setTitle(state, value) {
  //   state.title = value;
  //   sessionStorage.setItem("infoTitle", value);
  // }
};

// 异步操作
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
