import { Link } from 'react-router-dom'
import AsideFilter from './AsideFilter'
import Sort from './Sort'
import Product from './Product'

function ProductList() {
  return (
    <div className=''>
      <div className='py-5 grid grid-cols-12 gap-4 mx-auto max-w-7xl'>
        <div className='col-span-2'>
          <AsideFilter />
        </div>
        <div className='col-span-10'>
          <Sort />
          <div className='grid grid-cols-12 gap-4'>
            {Array(20)
              .fill(0)
              .map((_, index) => {
                return (
                  <div className='lg:col-span-3 md:col-span-4 col-span-6' key={index}>
                    <Link to={''}>
                      <Product />
                    </Link>
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
