import { icons } from '~/assets/icons'
import Button from '~/components/Button/Button'

function Sort() {
  return (
    <div className='flex items-center justify-between bg-gray-300 mb-6 px-5 py-3'>
      <div className='flex items-center '>
        <div className='text-[#555] text-sm  mr-3 flex items-center'>Sắp xếp theo</div>
        <Button
          nameBtn='phổ biến'
          className=' capitalize rounded-sm p-2 bg-orange text-sm text-center text-white outline-none border-none  mr-3 hover:opacity-80'
        />
        <Button
          nameBtn='mới nhất'
          className=' capitalize rounded-sm p-2 bg-white text-sm text-center text-[#333] outline-none border-none  mr-3 hover:opacity-80'
        />
        <Button
          nameBtn='bán chạy'
          className=' capitalize rounded-sm p-2 bg-white text-sm text-center text-[#333] outline-none border-none  mr-3 hover:opacity-80'
        />
        <select className='text-left cursor-pointer capitalize rounded-sm p-2 bg-white text-sm  outline-none border-none '>
          <option value='' disabled>
            Giá
          </option>
          <option value='price:decrease'>Giá: giá thấp đến cao</option>
          <option value='price:increase'>Giá: giá cao đến thấp</option>
        </select>
      </div>
      <div className='flex items-center'>
        <div className='text-sm mr-5'>
          <span className='text-orange '>1</span>
          <span>/9</span>
        </div>
        <div className='flex '>
          <Button className='w-9 h-9 capitalize  rounded-l-sm p-2 bg-white text-sm text-center text-[#333] outline-none border-none opacity-60 cursor-not-allowed'>
            <img src={icons.chevronLeft} alt='chevron-left' />
          </Button>
          <Button className='w-9 h-9 capitalize rounded-r-sm p-2 bg-white text-sm text-center text-[#333] outline-none border-none hover:opacity-80'>
            <img src={icons.chevronRight} alt='chevron-left' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sort
