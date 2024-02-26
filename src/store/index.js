import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  // state,
  // getters,
  // mutations,
  // actions

  state() {
    return {
      loading: false
    }
  },
  getters: {
    isLoading: (state) => state.loading
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value
    }
  },
  actions: {
    setLoading({ commit }, value) {
      commit('SET_LOADING', value)
    }
  }
})

export default store
