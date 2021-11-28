import Vuex from 'vuex';
import Vue from 'vue';
import search from './modules/search';
import formReport from './modules/formReport';

Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    search,
    formReport
  },
})
