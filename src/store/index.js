import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage:{
      id:'',
      title:'',
      content:''
    }
  },
  mutations: {
    setCurrentPage(state, data) {
      state.currentPage = data
    },
  },
  actions: {
  },
  modules: {
  }
})
