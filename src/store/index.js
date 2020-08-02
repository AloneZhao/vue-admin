import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app'
import common from './modules/common'
import infoDetailed from './modules/infoDetailed'

export default new Vuex.Store({
  modules: {
    app,
    common,
    infoDetailed
  }
})
