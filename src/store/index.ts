import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { RDStoreType } from './type'
import { getPageListData } from '@/server/main/system/system'
import login from './login/login'
import system from './main/system/system'
import { dashboard } from './main/analysis/dashboard'
const store = createStore({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, departmentList) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList) {
      state.entireMenu = menuList
    }
  },
  actions: {
    async getInitDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
function initStore(): void {
  store.dispatch('login/initStoreAction')
  store.dispatch('getInitDataAction')
}
export function useStore(): Store<RDStoreType> {
  return useVuexStore()
}
export { store, initStore }
