import type { Module } from 'vuex'

import type { RDLoginState } from './type'
import type { RDRootState } from '../type'
import router from '@/route'
import {
  requestLogin,
  requestLoginUserInfo,
  requestLogiUserMenu
} from '@/server/login/login'
import { IAccount } from '@/server/login/type'
import localCache from '@/util/cache'
import mapMenuRouter from '@/util/map-router'
import mapMenuPermissions from '@/util/map-menu-permissons'
const login: Module<RDLoginState, RDRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu
      const routes = mapMenuRouter(userMenu)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 拿到用户权限管理
      const permissons = mapMenuPermissions(userMenu)
      state.permissions = permissons
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 实现登录逻辑
      const loginResult = await requestLogin(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 请求用户信息
      const userInfoResult = await requestLoginUserInfo(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 请求用户菜单
      const userMenuResult = await requestLogiUserMenu(userInfo.role.id)
      const userMenu = userMenuResult.data
      commit('changeUserMenu', userMenu)
      localCache.setCache('userMenu', userMenu)
      // 跳到首页
      router.push('/main')
    },
    initStoreAction({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
      // 跳到首页
    }
  }
}
export default login
