import classNames from 'classnames'
import { icons } from '~/assets/icons'
interface PanigationProps {
  pageCurrent: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}
function Panigation(props: PanigationProps) {
  const { pageCurrent, setPage } = props
  const renderPanigation = () => {
    const pageSize = 20
    const RANGE = 2
    const calculatorRange = (range: 'larger' | 'smaller') => {
      if (range === 'larger') {
        return RANGE + pageCurrent
      } else if (range === 'smaller') {
        return pageCurrent - RANGE
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
                <button
                  className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm mx-2 text-gray-500'
                  key={index}
                >
                  ...
                </button>
              )
            } else if (pageNumber < calculatorRange('smaller') - 1) return null
            else
              return (
                <button
                  className={classNames(
                    'flex justify-center items-center  w-10 h-8 rounded-sm mx-2 text-gray-500  hover:bg-white/70',
                    {
                      'bg-orange text-white hover:bg-orange': pageNumber === pageCurrent,
                      'bg-transparent text-gray-500': pageNumber !== pageCurrent
                    }
                  )}
                  key={index}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
          } else if (pageNumber === calculatorRange('larger') + 1) {
            return (
              <button
                className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm mx-2 text-gray-500'
                key={index}
              >
                ...
              </button>
            )
          } else return null
        } else
          return (
            <button
              className={classNames(
                'flex justify-center items-center  w-10 h-8 rounded-sm mx-2 text-gray-500  hover:bg-white/70',
                {
                  'bg-orange text-white hover:bg-orange': pageNumber === pageCurrent,
                  'bg-transparent text-gray-500': pageNumber !== pageCurrent
                }
              )}
              key={index}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
      })
  }
  return (
    <div className='flex items-center mt-10 flex-wrap justify-center'>
      <button className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm mr-3'>
        <img
          src={icons.chevronLeft}
          alt='chevron-left'
          className='w-5 h-5 
'
        />
      </button>
      {renderPanigation()}
      <button className='flex justify-center items-center bg-transparent  w-10 h-8 rounded-sm ml-3'>
        <img src={icons.chevronRight} alt='chevron-right' className='w-5 h-5 ' />
      </button>
    </div>
  )
}

export default Panigation
