import AsideFilter from './AsideFilter'
import Sort from './Sort'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '~/hooks/useQueryParams'
import { getProductList } from '~/apis/product.api'
import Panigation from '~/components/Panigation'
import { ProductListConfig } from '~/types/product.type'
import { isUndefined, omitBy } from 'lodash'

function ProductList() {
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
      sort_by: queryParams.sort_by
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['productList', queryParams],
    queryFn: () => getProductList(queryParams),
    keepPreviousData: true
  })
  return (
    <div className=''>
      <div className='py-5 grid grid-cols-12 gap-4 mx-auto max-w-7xl'>
        <div className='col-span-2'>
          <AsideFilter />
        </div>
        <div className='col-span-10'>
          <Sort />
          {data && (
            <>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {data?.data.data.products.map((product) => {
                  return (
                    <div className='' key={product._id}>
                      <Product {...product} />
                    </div>
                  )
                })}
              </div>
              <Panigation queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
