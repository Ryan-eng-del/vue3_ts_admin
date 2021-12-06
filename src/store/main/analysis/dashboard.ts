import { Module } from 'vuex'

import { DashboardState } from './type'
import { RDRootState } from '../../type'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/server/main/analysis/dashboard'
export const dashboard: Module<DashboardState, RDRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult: any = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      const categorySaleResult: any = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)
      const categoryFavorResult: any = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      const addressGoodsResult: any = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsResult.data)
    }
  }
}
