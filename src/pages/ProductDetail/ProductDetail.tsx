import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '~/apis/product.api'
import Button from '~/components/Button/Button'
import InputNumber from '~/components/InputNumber'
import ProductRating from '~/components/ProductRating'
import { Product } from '~/types/product.type'
import { formatNumberToSocial, formatPrice } from '~/utils/formatPrice'
import { calculatorDiscountPercent } from '~/utils/utils'

function ProductDetail() {
  const [activeImage, setActiveImage] = useState<string>()
  const [slideImages, setSlideImage] = useState<number[]>([0, 5])
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetail(id as string)
  })
  const product = data?.data.data
  const handleImageActive = (image: string) => {
    setActiveImage(image)
  }
  const handleNextSlide = () => {
    if (slideImages[1] < (product as Product).images.length) {
      setSlideImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const handlePreviousSlide = () => {
    if (slideImages[0] > 0) {
      setSlideImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])
  if (!product) return null
  return (
    <div className='max-w-7xl mx-auto py-10'>
      <div className='bg-white rounded-md p-3'>
        <div className='grid grid-cols-12 gap-9'>
          <div className='col-span-5'>
            <div className='relative w-full pt-[100%] h-[450px]'>
              <img src={activeImage} alt={activeImage} className='absolute  top-0 left-0 w-full h-full' />
            </div>
            <div className='relative grid grid-cols-5 gap-1 mt-2'>
              <button
                className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/40 text-white'
                onClick={handlePreviousSlide}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='text-white'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>
              {product.images.slice(...slideImages).map((image) => {
                const isActive = image === activeImage
                return (
                  <div
                    className='relative w-full pt-[100%] cursor-pointer'
                    key={image}
                    onMouseEnter={() => handleImageActive(image)}
                  >
                    <img src={image} alt={image} className='absolute  top-0 left-0 w-full h-full' />
                    {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                  </div>
                )
              })}
              <button
                className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/40 text-white'
                onClick={handleNextSlide}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='text-white'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
          <div className='col-span-7'>
            <h1 className='text-[#333] font-semibold'>{product.name}</h1>
            <div className='flex items-center mt-3'>
              <div className='cursor-pointer pr-4 border-r border-r-solid border-r-gray-400 flex items-center'>
                <span className='text-sm text-orange underline mr-2'>{product.rating}</span>
                <ProductRating
                  rating={product.rating}
                  activeClassname='w-4 h-4 fill-orange text-orange'
                  nonActiveclassname='w-4 h-4 fill-current text-gray-300'
                />
              </div>
              <div className='cursor-pointer pl-4 flex items-center'>
                <span className='mr-2 text-sm'>{formatNumberToSocial(product.sold)}</span>
                <span className='text-gray-500 text-sm'>Đã bán</span>
              </div>
            </div>
            <div className='flex items-center mt-8'>
              <span className='text-base text-gray-500 mr-3 line-through'>
                đ{formatPrice(product.price_before_discount)}
              </span>
              <span className='text-orange text-2xl mr-3'>đ{formatPrice(product.price)}</span>
              <span className='bg-orange p-[1px] rounded-sm text-white text-[12px] font-semibold'>
                {calculatorDiscountPercent(product.price, product.price_before_discount)} Giảm
              </span>
            </div>
            <div className='flex items-center mt-8'>
              <span className='text-gray-500 text-sm mr-4'>Số Lượng</span>
              <div className='flex items-center mr-4 border border-solid border-gray-400 rounded-sm'>
                <Button
                  className='flex items-center justify-center  p-1 bg-white text-sm text-center text-[#333] outline-none  w-[32px] h-[32px]'
                  nameBtn='-'
                />
                <InputNumber
                  value={1}
                  classWrapper=''
                  classInput='bg-white text-sm text-center text-[#333] outline-none border-x border-x-solid border-gray-400 w-[32px] h-[32px]'
                  classError='hidden'
                />
                <Button
                  className='flex items-center justify-center  p-1 bg-white text-sm text-center text-[#333] outline-none  w-[32px] h-[32px]'
                  nameBtn='+'
                />
              </div>
              <span className='text-gray-500 text-sm mr-4'>{product.quantity} sản phẩm có sẵn</span>
            </div>
            <div className='flex items-center mt-8'>
              <Button className='flex items-center mr-3 mt-2 capitalize rounded-sm p-2 bg-orange/20 text-sm text-center text-orange outline-none border border-solid border-orange w-[180px] h-[50px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>

                <span className='ml-1'>thêm vào giỏ hàng</span>
              </Button>
              <Button
                nameBtn='mua ngay'
                className='mr-3 mt-2 capitalize rounded-sm p-2 bg-orange text-sm text-center text-white outline-none border-none w-[180px] h-[50px]'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white rounded-md p-3 leading-6'>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
      </div>
    </div>
  )
}

export default ProductDetail
