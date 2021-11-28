const state = {
  title: '',
  content: '',
  city: '',
  stateName: '',
  actor: '',
  company: ''
}

const getters = {
  reportTitle(state) {
    return state.title
  },
  reportContent(state) {
    return state.content
  },
  reportCity(state) {
    return state.city
  },
  reportState(state) {
    return state.stateName
  },
  reportActor(state) {
    return state.actor
  },
  reportCompany(state) {
    return state.company
  }
}

const actions = {
  updateTitle({ commit }, title) {
    commit('changeTitle', title)
  },
  updateContent({ commit }, content) {
    commit('changeContent', content)
  },
  updateCity({commit}, city) {
    commit('changeCity', city)
  },
  updateState({commit}, state) {
    commit('changeState', state)
  },
  updateActor({commit}, actor) {
    commit('changeActor', actor)
  },
  updateCompany({commit}, company) {
    commit('changeCompany', company)
  },
  refreshState({commit}) {
    commit('changeTitle', '')
    commit('changeContent', '')
    commit('changeCity', '')
    commit('changeState', '')
    commit('changeActor', '')
    commit('changeCompany', '')
  }
};

const mutations = {
  setReportData: (state, reportData) => (state.reportData = reportData),
  changeTitle: (state, title) => (state.title = title),
  changeContent: (state, content) => (state.content = content),
  changeCity: (state, city) => (state.city = city),
  changeState: (state, stateName) => (state.stateName = stateName),
  changeActor: (state, actor) => (state.actor = actor),
  changeCompany: (state, company) => (state.company = company)

};

export default {
  state,
  getters,
  actions,
  mutations
}
