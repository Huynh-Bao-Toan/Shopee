import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { icons } from '~/assets/icons'
import { ProductListConfig } from '~/types/product.type'

interface PanigationProps {
  queryConfig: { [key in keyof ProductListConfig]: string }
  pageSize: number
}
function Panigation(props: PanigationProps) {
  const { pageSize, queryConfig } = props
  const { page } = queryConfig
  const renderPanigation = () => {
    const RANGE = 2
    const calculatorRange = (range: 'larger' | 'smaller') => {
      if (range === 'larger') {
        return RANGE + Number(page)
      } else if (range === 'smaller') {
        return Number(page) - RANGE
      } else return 0
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (pageNumber > 2 && pageNumber < pageSize - 1) {
          if (pageNumber <= calculatorRange('larger')) {
            if (pageNumber === calculatorRange('smaller') - 1) {
              return (
                <span
                  className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm mx-2 text-gray-500'
                  key={index}
                >
                  ...
                </span>
              )
            } else if (pageNumber < calculatorRange('smaller') - 1) return null
            else
              return (
                <Link
                  to={{
                    pathname: '/',
                    search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
                  }}
                  className={classNames('flex justify-center items-center  w-10 h-8 rounded-sm mx-2 text-gray-500  ', {
                    'bg-orange text-white hover:bg-orange': pageNumber === Number(page),
                    'bg-transparent text-gray-500 hover:bg-white/70': pageNumber !== Number(page)
                  })}
                  key={index}
                >
                  {pageNumber}
                </Link>
              )
          } else if (pageNumber === calculatorRange('larger') + 1) {
            return (
              <span
                className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm mx-2 text-gray-500'
                key={index}
              >
                ...
              </span>
            )
          } else return null
        } else
          return (
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
              }}
              className={classNames('flex justify-center items-center  w-10 h-8 rounded-sm mx-2 text-gray-500  ', {
                'bg-orange text-white hover:bg-orange': pageNumber === Number(page),
                'bg-transparent text-gray-500 hover:bg-white/70': pageNumber !== Number(page)
              })}
              key={index}
            >
              {pageNumber}
            </Link>
          )
      })
  }
  return (
    <div className='flex items-center mt-10 flex-wrap justify-center'>
      {Number(page) === 1 ? (
        <span className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm mr-3 cursor-not-allowed'>
          <img
            src={icons.chevronLeft}
            alt='chevron-left'
            className='w-5 h-5 
'
          />
        </span>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({ ...queryConfig, page: (Number(page) - 1).toString() }).toString()
          }}
          className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm mr-3'
        >
          <img
            src={icons.chevronLeft}
            alt='chevron-left'
            className='w-5 h-5 
'
          />
        </Link>
      )}
      {renderPanigation()}
      {Number(page) === pageSize ? (
        <span className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm ml-3 cursor-not-allowed'>
          <img src={icons.chevronRight} alt='chevron-right' className='w-5 h-5 ' />
        </span>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({ ...queryConfig, page: (Number(page) + 1).toString() }).toString()
          }}
          className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm ml-3'
        >
          <img src={icons.chevronRight} alt='chevron-right' className='w-5 h-5 ' />
        </Link>
      )}
    </div>
  )
}

export default Panigation
