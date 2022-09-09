export default {
    namespaced: true,
    state: {
      type: 'pokemon'
    },
    mutations: {
      setType(state, value) {
        state.type = value
      },
    }
  }