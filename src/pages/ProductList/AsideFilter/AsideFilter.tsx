import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { icons } from '~/assets/icons'
import Button from '~/components/Button/Button'
import InputNumber from '~/components/InputNumber'
import { categoriesResponse } from '~/types/categories.type'
import { ProductListConfig } from '~/types/product.type'
import { PriceSchema, priceSchema } from '~/utils/rulesForm'
import RatingStar from '../RatingStar'
interface AsideFilterProps {
  categories: categoriesResponse
  queryConfig: { [key in keyof ProductListConfig]: string }
}
function AsideFilter(props: AsideFilterProps) {
  const { categories, queryConfig } = props
  const naviagte = useNavigate()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<PriceSchema>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })
  const onSubmit = handleSubmit((data) => {
    naviagte({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max || '',
        price_min: data.price_min || ''
      }).toString()
    })
  })
  const handleFilterClear = () => {
    naviagte({
      pathname: '/',
      search: createSearchParams(omit(queryConfig, ['category', 'price_max', 'price_min', 'rating_filter'])).toString()
    })
  }
  return (
    <div className='w-full'>
      <div className='ml-4'>
        <div className='py-4 border-b border-slate-400  flex items-end '>
          <img src={icons.listBullet} alt='list-bullet' className='w-4 h-5' />
          <Link to={'/'} className='font-bold capitalize ml-2 no-underline'>
            Tất cả danh mục
          </Link>
        </div>
        <div className=' py-4 pl-3'>
          <ul className='list-none'>
            {categories.map((item) => {
              const isActive = item._id === queryConfig.category
              return (
                <li key={item._id}>
                  <Link
                    to={{
                      pathname: '/',
                      search: createSearchParams(
                        omit({ ...queryConfig, category: item._id.toString() }, ['page'])
                      ).toString()
                    }}
                    className={`flex items-center text-sm ${isActive ? 'text-orange font-bold' : ''} py-2 relative`}
                  >
                    {isActive && (
                      <svg viewBox='0 0 4 7' className='w-2 h-2 fill-orange absolute -left-3'>
                        <polygon points='4 3.5 0 0 0 7' />
                      </svg>
                    )}
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className='ml-4'>
        <div className='py-4 border-b border-slate-400  flex items-center '>
          <img src={icons.funnel} alt='list-bullet' className='w-4 h-5' />
          <span className='font-bold capitalize ml-3'>bộ lọc tìm kiếm</span>
        </div>
        <div className=' py-4'>
          <div className='text-sm capitalize mb-3'>khoảng giá</div>
          <form onSubmit={onSubmit}>
            <div className='flex items-center justify-between'>
              <Controller
                name='price_min'
                control={control}
                render={({ field }) => {
                  return (
                    <InputNumber
                      placeholder='₫ TỪ'
                      type='text'
                      classWrapper='max-h-[40px] mb-3'
                      onChange={(e) => {
                        field.onChange(e)
                        trigger('price_max')
                      }}
                      value={field.value}
                      classError='hidden'
                    />
                  )
                }}
              />
              <div className='bg-[#bdbdbd]  mx-4 h-[2px] w-6' />
              <Controller
                name='price_max'
                control={control}
                render={({ field }) => {
                  return (
                    <InputNumber
                      placeholder='₫ ĐẾN'
                      type='text'
                      classWrapper='max-h-[40px] mb-3'
                      onChange={(e) => {
                        field.onChange(e)
                        trigger('price_min')
                      }}
                      value={field.value}
                      classError='hidden'
                    />
                  )
                }}
              />
            </div>
            <div className='mt-1 text-sm text-red-600 dark:text-red-500 text-center'>{errors.price_min?.message}</div>
            <Button nameBtn='Áp dụng' />
          </form>
        </div>
        <div className=' py-4'>
          <div className='text-sm capitalize mb-3'>đánh giá</div>
          <RatingStar queryConfig={queryConfig} />
        </div>
        <div className='mt-3'>
          <Button nameBtn='xóa tất cả' onClick={handleFilterClear} />
        </div>
      </div>
    </div>
  )
}

export default AsideFilter
