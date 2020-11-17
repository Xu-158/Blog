import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playUrl: '',
  },
  mutations: {
    setPlay(state, payload) {
      state.playUrl = payload.url
    }
  }
})

export default store