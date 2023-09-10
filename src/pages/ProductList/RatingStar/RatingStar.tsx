import { createSearchParams, useNavigate } from 'react-router-dom'
import { IconKeys, icons } from '~/assets/icons'
import { ProductListConfig } from '~/types/product.type'
interface RatingStarProps {
  queryConfig: { [key in keyof ProductListConfig]: string }
}
function RatingStar({ queryConfig }: RatingStarProps) {
  const navigate = useNavigate()
  const handleStarFilter = (ratingStar: number) => {
    navigate({
      pathname: '/',
      search: createSearchParams({ ...queryConfig, rating_filter: ratingStar.toString() }).toString()
    })
  }
  return (
    <ul className='list-none'>
      {Array(5)
        .fill(0)
        .map((_, ratingStar) => {
          return (
            <li className='px-3 mt-2' key={ratingStar}>
              <div
                className='flex items-center'
                onClick={() => handleStarFilter(5 - ratingStar)}
                tabIndex={0}
                role='button'
                aria-hidden='true'
              >
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    if (index < 5 - ratingStar) {
                      return <img src={icons.starFill} alt={IconKeys.starFill} key={index} />
                    } else
                      return (
                        <svg viewBox='0 0 30 30' className='w-4 h-4' key={index}>
                          <defs>
                            <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                              <stop offset='0%' stopColor='#FFD211' />
                              <stop offset='100%' stopColor='#FFAD27' />
                            </linearGradient>
                          </defs>
                          <path
                            fill='none'
                            fillRule='evenodd'
                            stroke='url(#star__hollow)'
                            strokeWidth={2}
                            d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                          />
                        </svg>
                      )
                  })}
                {ratingStar !== 0 && <span className='text-sm ml-1'>trở lên</span>}
              </div>
            </li>
          )
        })}
    </ul>
  )
}

export default RatingStar
