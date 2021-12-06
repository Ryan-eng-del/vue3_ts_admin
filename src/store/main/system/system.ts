import { Module } from 'vuex'
import { RDRootState } from '../../type'
import { RDSystemState } from './type'
import {
  getPageListData,
  getDeleteAction,
  createNewData,
  editPageData
} from '@/server/main/system/system'
const systemStore: Module<RDSystemState, RDRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersData(state, list) {
      state.usersList = list
    },
    changeUsersCount(state, totalCount) {
      state.usersCount = totalCount
    },
    changeRoleData(state, list) {
      state.roleList = list
    },
    changeRoleCount(state, totalCount) {
      state.roleCount = totalCount
    },
    changeGoodsData(state, list) {
      state.goodsList = list
    },
    changeGoodsCount(state, totalCount) {
      state.goodsCount = totalCount
    },
    changeMenuData(state, list) {
      state.menuList = list
    },
    changeMenuCount(state, totalCount) {
      state.menuCount = totalCount
    }
  },
  getters: {
    getListData(state) {
      return function (propName: string) {
        return (state as any)[`${propName}List`]
      }
    },
    getListCount(state) {
      return function (propName: string) {
        return (state as any)[`${propName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, playload: any) {
      const propName = playload.pageName
      const pageUrl = `${propName}/list`
      const pageListResult: any = await getPageListData(
        pageUrl,
        playload.queryInfo
      )
      const { list, totalCount } = pageListResult.data
      const innerName = propName.slice(0, 1).toUpperCase() + propName.slice(1)
      commit(`change${innerName}Data`, list)
      commit(`change${innerName}Count`, totalCount)
    },
    async deletePageAction({ dispatch }, playload: any) {
      const { id, pageName } = playload
      const pageUrl = `/${pageName}/${id}`
      await getDeleteAction(pageUrl)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, playload: any) {
      const { pageName, newData } = playload
      const pageUrl = `/${pageName}`
      await createNewData(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, playload: any) {
      const { pageName, id, editData } = playload

      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemStore
