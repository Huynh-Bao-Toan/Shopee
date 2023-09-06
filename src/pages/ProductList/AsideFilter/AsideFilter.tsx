import { Link } from 'react-router-dom'
import { icons } from '~/assets/icons'
import Button from '~/components/Button/Button'
import Input from '~/components/Input'

function AsideFilter() {
  return (
    <div className='w-full'>
      <div className='ml-4'>
        <div className='py-4 border-b border-slate-400  flex items-end '>
          <img src={icons.listBullet} alt='list-bullet' className='w-4 h-5' />
          <Link to='' className='font-bold capitalize ml-2 no-underline'>
            Tất cả danh mục
          </Link>
        </div>
        <div className=' py-4 pl-3'>
          <div className='text-sm font-bold capitalize mb-3'>thời trang nam</div>
          <ul className='list-none'>
            <li className='flex items-center text-sm text-orange py-2 relative'>
              <svg viewBox='0 0 4 7' className='w-2 h-2 fill-orange absolute -left-3'>
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
              <span>Áo Khoác</span>
            </li>
            <li className='flex items-center text-sm py-2'>
              <span>Áo Vest và Blazerc</span>
            </li>
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
          <form>
            <div className='flex items-center justify-between'>
              <Input placeholder='₫ TỪ' type='text' classWrapper='max-h-[40px] mb-3' />
              <div className='bg-[#bdbdbd] h-[2px] mx-4 h-6 w-6' />
              <Input placeholder='₫ ĐẾN' type='text' classWrapper='max-h-[40px] mb-3' />
            </div>
            <Button nameBtn='Áp dụng' />
          </form>
        </div>
        <div className=' py-4'>
          <div className='text-sm capitalize mb-3'>đánh giá</div>
          <ul className='list-none'>
            <li className='px-3 mt-2'>
              <Link to='' className='flex items-center'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    return <img src={icons.starFill} alt='star-fill' key={index} />
                  })}
              </Link>
            </li>
            <li className='px-3 mt-2'>
              <Link to='' className='flex items-center'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    return <img src={icons.starFill} alt='star-fill' key={index} />
                  })}
                <span className='text-sm'>trở lên</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className='mt-3'>
          <Button nameBtn='xóa tất cả' />
        </div>
      </div>
    </div>
  )
}

export default AsideFilter
