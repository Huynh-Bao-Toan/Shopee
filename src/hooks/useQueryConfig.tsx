import { isUndefined, omitBy } from 'lodash'
import { ProductListConfig } from '~/types/product.type'
import { useQueryParams } from './useQueryParams'

const useQueryConfig = () => {
  const queryParams: ProductListConfig = useQueryParams()
  const queryConfig: { [key in keyof ProductListConfig]: string } = omitBy(
    {
      exclude: queryParams.exclude,
      limit: queryParams.limit,
      name: queryParams.name,
      order: queryParams.order,
      page: queryParams.page || 1,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
export default useQueryConfig
