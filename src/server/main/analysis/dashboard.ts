import RDRequest from '../../index'
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return RDRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return RDRequest.get({
    url: DashboardAPI.categoryGoodsSale,
    isLoading: false
  })
}

export function getCategoryGoodsFavor() {
  return RDRequest.get({
    url: DashboardAPI.categoryGoodsFavor,
    isLoading: false
  })
}

export function getAddressGoodsSale() {
  return RDRequest.get({
    url: DashboardAPI.addressGoodsSale,
    isLoading: false
  })
}
