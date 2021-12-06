import RDRequest from '@/server'
import { IDataType } from '../../login/type'
export function getPageListData(url: string, data: any) {
  return RDRequest.post<IDataType>({
    url,
    data
  })
}
export function getDeleteAction(url: string) {
  return RDRequest.delete<IDataType>({
    url
  })
}
export function createNewData(url: string, data: any) {
  return RDRequest.post<IDataType>({
    url,
    data
  })
}
export function editPageData(url: string, data: any) {
  return RDRequest.post<IDataType>({
    url,
    data
  })
}
