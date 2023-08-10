import Vue from 'vue'
import Vuex from 'vuex'
import pathify, { make } from 'vuex-pathify'
import todo from './todo'

const state = {}
const mutations = make.mutations(state)

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  mutations,
  actions: {},
  modules: {
    todo,
    dialog: {
      state: {
      },
      mutations: {
      },
      actions: {
      },
      namespaced: true
    }
  }
})
