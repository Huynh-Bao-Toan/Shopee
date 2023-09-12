import AsideFilter from './AsideFilter'
import Sort from './Sort'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import { getProductList } from '~/apis/product.api'
import Panigation from '~/components/Panigation'
import { getCategories } from '~/apis/categories.api'
import useQueryConfig from '~/hooks/useQueryConfig'
import { ProductListConfig } from '~/types/product.type'

function ProductList() {
  const queryConfig = useQueryConfig()
  const { data } = useQuery({
    queryKey: ['productList', queryConfig],
    queryFn: () => getProductList(queryConfig as ProductListConfig),
    keepPreviousData: true
  })
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })
  return (
    <div className=''>
      <div className='py-5 grid grid-cols-12 gap-4 mx-auto max-w-7xl'>
        <div className='col-span-2'>
          <AsideFilter categories={categories?.data.data ?? []} queryConfig={queryConfig} />
        </div>
        <div className='col-span-10'>
          {data && (
            <>
              <Sort queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
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
