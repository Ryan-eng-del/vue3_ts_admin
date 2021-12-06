import RDRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'
enum loginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  LoginUserMenu = '/role/'
}

export function requestLogin(
  account: IAccount
): Promise<IDataType<ILoginResult>> {
  return RDRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account
  })
}
export function requestLoginUserInfo(id: number): Promise<IDataType> {
  return RDRequest.get<IDataType>({
    url: loginAPI.LoginUserInfo + id,
    isLoading: false
  })
}
export function requestLogiUserMenu(id: number): Promise<IDataType> {
  return RDRequest.get<IDataType>({
    url: loginAPI.LoginUserMenu + id + '/menu',
    isLoading: false
  })
}
