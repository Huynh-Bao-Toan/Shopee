import { Product, ProductList, ProductListConfig } from '~/types/product.type'
import { ResponseApi } from '~/types/utils.type'
import { http } from '~/utils/http'

export const getProductList = (params: ProductListConfig) =>
  http.get<ResponseApi<ProductList>>('/products', {
    params: {
      ...params
    }
  })

export const getProductDetail = (id: string) => http.get<ResponseApi<Product>>(`/products/${id}`)
