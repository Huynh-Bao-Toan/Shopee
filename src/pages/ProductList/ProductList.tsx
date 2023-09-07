import AsideFilter from './AsideFilter'
import Sort from './Sort'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '~/hooks/useQueryParams'
import { getProductList } from '~/apis/product.api'

function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['productList', queryParams],
    queryFn: () => getProductList(queryParams)
  })
  return (
    <div className=''>
      <div className='py-5 grid grid-cols-12 gap-4 mx-auto max-w-7xl'>
        <div className='col-span-2'>
          <AsideFilter />
        </div>
        <div className='col-span-10'>
          <Sort />
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {data &&
              data?.data.data.products.map((product) => {
                return (
                  <div className='' key={product._id}>
                    <Product {...product} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
