import type { RDLoginState } from './login/type'
import type { RDSystemState } from './main/system/type'
import type { DashboardState } from './main/analysis/type'
export interface RDRootState {
  entireDepartment: any
  entireRole: any
  entireMenu: any
}
export interface RDStoreType extends RDRootState {
  login: RDLoginState
  system: RDSystemState
  dashboard: DashboardState
}
