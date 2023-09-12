import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetail, getProductList } from '~/apis/product.api'
import Button from '~/components/Button/Button'
import ProductRating from '~/components/ProductRating'
import { Product as ProductType, ProductListConfig } from '~/types/product.type'
import { formatNumberToSocial, formatPrice } from '~/utils/formatPrice'
import { calculatorDiscountPercent, getIdFromNameId } from '~/utils/utils'
import Product from '../ProductList/Product'
import QuantityController from '~/components/QuantityController'

function ProductDetail() {
  const [activeImage, setActiveImage] = useState<string>()
  const [slideImages, setSlideImage] = useState<number[]>([0, 5])
  const [quantity, setQuantity] = useState<number>(1)
  const imageRef = useRef<HTMLImageElement>(null)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetail(id as string)
  })
  const product = data?.data.data
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])
  const queryConfig: ProductListConfig = { limit: 20, page: 1, category: product?.category._id }
  const { data: productList } = useQuery({
    queryKey: ['productList', queryConfig],
    queryFn: () => getProductList(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })
  const handleImageActive = (image: string) => {
    setActiveImage(image)
  }
  const handleNextSlide = () => {
    if (slideImages[1] < (product as ProductType).images.length) {
      setSlideImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const handlePreviousSlide = () => {
    if (slideImages[0] > 0) {
      setSlideImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  if (!product) return null
  return (
    <div className='max-w-7xl mx-auto py-10'>
      <div className='bg-white rounded-md p-3'>
        <div className='grid grid-cols-12 gap-9'>
          <div className='col-span-5'>
            <div
              className='relative w-full pt-[100%] h-[450px] cursor-zoom-in overflow-hidden'
              onMouseMove={handleZoom}
              onMouseLeave={handleRemoveZoom}
            >
              <img
                src={activeImage}
                alt={activeImage}
                ref={imageRef}
                className='absolute  top-0 left-0 w-full h-full'
              />
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
              <QuantityController quantity={quantity} max={product.quantity} setQuantity={setQuantity} />
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
      <div className='mt-8  '>
        <div className='uppercase text-gray-400'>bạn có thể thích</div>
        <div className='mt-4 bg-white rounded-md p-3 leading-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {productList?.data.data.products.map((product) => {
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

export default ProductDetail
