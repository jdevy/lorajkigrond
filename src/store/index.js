/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import graphqlClient from '../utils/graphql'
import { ALL_LINKS_QUERY, LAST_DIFFUSIONS } from '../constants/graphql'
import listChaines from "@/assets/liste_chaines.json"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    month: 10,
    day: 12,
    year: 2008,
    description: '54',
    url: 'dd',
    listeChaineChoisie: [],
    listeChaines: listChaines,
    currentChaine: "",
    currentPrefixUrl: "",
    // allLinks: [],
    // diffusionsOfShowByUrl: {}
  },
  getters: {},
  mutations: {
    // SET_ALL_LINKS(state, allLinks) {
    //   state.allLinks = allLinks
    // },
    // SET_LAST_DIFFUSIONS(state, diffusions) {
    //   state.diffusionsOfShowByUrl = diffusions
    // },
    SET_CURRENT_CHAINE(state, selectedChaine) {
      state.currentChaine = selectedChaine
    },
    SET_CURRENT_PREFIX_URL(state, selectedPrefixUrl) {
      state.currentPrefixUrl = selectedPrefixUrl
    },
    SET_CURRENT_LIST_CHAINE_EMISSIONS(state, selectedListEmission) {
      state.listeChaineChoisie = selectedListEmission
    }
  },
  actions: {
    // async fetchAllLinks({ commit }) {
    //   const response = await graphqlClient.query({
    //     query: ALL_LINKS_QUERY
    //   })
    //   commit('SET_ALL_LINKS', response.data.allLinks)
    // },
    // async fetchLastDiffusions({ commit }, payload) {
    //   const response = await graphqlClient.query({
    //     query: LAST_DIFFUSIONS,
    //     variables: {
    //       url: payload.url,
    //       first: payload.first
    //     }
    //   })
    //   commit('SET_LAST_DIFFUSIONS', response.data.diffusionsOfShowByUrl)
    // },
    updateSelectedChaine(context, chaine) {
      context.commit('SET_CURRENT_CHAINE', chaine.id)
      context.commit('SET_CURRENT_PREFIX_URL', chaine.prefix_url)
      context.commit('SET_CURRENT_LIST_CHAINE_EMISSIONS', require(`@/assets/${chaine.emissions_json_file}`))
    }
  },
  modules: {}
})
