import classNames from 'classnames'
import { omit } from 'lodash'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { icons } from '~/assets/icons'
import { order as orderConstant, sortBy } from '~/constants/product.constants'
import { ProductListConfig } from '~/types/product.type'
interface SortProps {
  queryConfig: { [key in keyof ProductListConfig]: string }
  pageSize: number
}
function Sort(props: SortProps) {
  const { queryConfig, pageSize } = props
  const { page, sort_by = 'view', order } = queryConfig
  const navigate = useNavigate()
  const handleChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({ ...queryConfig, sort_by: sortBy.price, order: e.target.value }).toString()
    })
  }
  return (
    <div className='flex items-center justify-between bg-gray-300 mb-6 px-5 py-3'>
      <div className='flex items-center '>
        <div className='text-[#555] text-sm  mr-3 flex items-center'>Sắp xếp theo</div>
        <Link
          to={{
            pathname: '/',
            search: createSearchParams(omit({ ...queryConfig, sort_by: sortBy.view }, ['order'])).toString()
          }}
          className={classNames(
            ' capitalize rounded-sm p-2  text-sm text-center  outline-none border-none  mr-3 hover:opacity-80',
            {
              'bg-orange text-white': sort_by === sortBy.view,
              'bg-white text-[#333]': sort_by !== sortBy.view
            }
          )}
        >
          phổ biến
        </Link>
        <Link
          to={{
            pathname: '/',
            search: createSearchParams(omit({ ...queryConfig, sort_by: sortBy.createdAt }, ['order'])).toString()
          }}
          className={classNames(
            ' capitalize rounded-sm p-2  text-sm text-center text-[#333] outline-none border-none  mr-3 hover:opacity-80',
            {
              'bg-orange text-white': sort_by === sortBy.createdAt,
              'bg-white text-[#333]': sort_by !== sortBy.createdAt
            }
          )}
        >
          mới nhất
        </Link>
        <Link
          to={{
            pathname: '/',
            search: createSearchParams(omit({ ...queryConfig, sort_by: sortBy.sold }, ['order'])).toString()
          }}
          className={classNames(
            ' capitalize rounded-sm p-2  text-sm text-center text-[#333] outline-none border-none  mr-3 hover:opacity-80',
            {
              'bg-orange text-white': sort_by === sortBy.sold,
              'bg-white text-[#333]': sort_by !== sortBy.sold
            }
          )}
        >
          bán chạy{' '}
        </Link>
        <select
          className={classNames(
            'text-left cursor-pointer capitalize rounded-sm p-2 text-sm  outline-none border-none ',
            {
              'bg-orange text-white': sort_by === sortBy.price,
              'bg-white text-[#333]': sort_by !== sortBy.price
            }
          )}
          value={order ?? ''}
          onChange={(e) => handleChangePrice(e)}
        >
          <option value='' disabled className='bg-white text-[#333]'>
            Giá
          </option>
          <option value={orderConstant.asc} className='bg-white text-[#333]'>
            Giá: giá thấp đến cao
          </option>
          <option value={orderConstant.desc} className='bg-white text-[#333]'>
            Giá: giá cao đến thấp
          </option>
        </select>
      </div>
      <div className='flex items-center'>
        <div className='text-sm mr-5'>
          <span className='text-orange '>{page}</span>
          <span>/{pageSize}</span>
        </div>
        <div className='flex '>
          {Number(page) === 1 ? (
            <span className='w-9 h-9 capitalize  rounded-l-sm p-2 bg-white text-sm text-center text-[#333] outline-none border-none opacity-60 cursor-not-allowed'>
              <img src={icons.chevronLeft} alt='chevron-left' />
            </span>
          ) : (
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  ...queryConfig,
                  page: (Number(page) - 1).toString()
                }).toString()
              }}
              className='w-9 h-9 capitalize rounded-r-sm p-2 bg-white text-sm text-center text-[#333] outline-none border-none hover:opacity-80'
            >
              <img src={icons.chevronLeft} alt='chevron-left' />
            </Link>
          )}
          {Number(page) === pageSize ? (
            <span className='w-9 h-9 capitalize  rounded-l-sm p-2 bg-white text-sm text-center text-[#333] outline-none border-none opacity-60 cursor-not-allowed'>
              <img src={icons.chevronRight} alt='chevron-left' />
            </span>
          ) : (
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  ...queryConfig,
                  page: (Number(page) + 1).toString()
                }).toString()
              }}
              className='w-9 h-9 capitalize rounded-r-sm p-2 bg-white text-sm text-center text-[#333] outline-none border-none hover:opacity-80'
            >
              <img src={icons.chevronRight} alt='chevron-left' />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sort
