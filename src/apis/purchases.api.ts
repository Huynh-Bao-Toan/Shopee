import { Purchase, PurchaseListStatus } from '~/types/purchases.type'
import { ResponseApi } from '~/types/utils.type'
import { http } from '~/utils/http'

export const getPurchases = (params: { status: PurchaseListStatus }) =>
  http.get<ResponseApi<Purchase[]>>('/purchases', {
    params
  })

export const addPurchases = (body: { product_id: string; buy_count: number }) =>
  http.post<ResponseApi<Purchase>>('/purchases/add-to-cart', body)
