import {APIService} from '../../http/APIService';
const apiService= new APIService();

const state = {
  companies: [
    {
      id: 1,
      name: 'Hollywood',
      industry: 'film'
    },
    {
      id: 2,
      name: 'Pandora',
      industry: 'retail'
    }
  ]
};

const getters = {
  allCompanies: (state) => state.companies
};

const actions = {
  async fetchCompanies({commit}) {
    const response = await apiService.getCompanyList();
    commit('setCompanies', response.data.data);
    console.log(response.data.data)
  }
};

const mutations = {
  setCompanies: (state, companies) => (state.companies = companies)
};

export default {
  state,
  getters,
  actions,
  mutations
}
