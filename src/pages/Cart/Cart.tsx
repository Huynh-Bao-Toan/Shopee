import { useMutation, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPurchases, updatePurchases } from '~/apis/purchases.api'
import Button from '~/components/Button/Button'
import QuantityController from '~/components/QuantityController'
import { purchasesStatus } from '~/constants/purchases.constants'
import { Purchase } from '~/types/purchases.type'
import { formatPrice } from '~/utils/formatPrice'
import { generateNameId } from '~/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
interface ExtendedPurchase extends Purchase {
  checked: boolean
  disabled: boolean
}
function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData, refetch: RefetchpurchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => getPurchases({ status: purchasesStatus.inCart })
  })
  const purchaseMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => updatePurchases(body),
    onSuccess: () => {
      RefetchpurchasesInCartData()
    }
  })
  const purchasesInCart = purchasesInCartData?.data.data
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          return {
            ...purchase,
            checked: Boolean(extendedPurchasesObject[purchase._id]?.checked),
            disabled: false
          }
        }) || []
      )
    })
  }, [purchasesInCart])
  const isCheckedAll = extendedPurchases.every((purchase) => purchase.checked === true)
  const handleCheck = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases((prev) => {
      return produce(prev, (draftState) => {
        draftState[index].checked = e.target.checked
      })
    })
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isCheckedAll
      }))
    )
  }
  const handleUpdateQuantity = (id: string) => (quantity: number) => {
    setExtendedPurchases((prev) => {
      return prev.map((purchase) => {
        const isPurchase = purchase.product._id === id
        return {
          ...purchase,
          buy_count: isPurchase ? quantity : purchase.buy_count,
          disabled: true
        }
      })
    })
    purchaseMutation.mutate({ product_id: id, buy_count: quantity })
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='max-w-7xl mx-auto'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isCheckedAll}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            className='h-20 w-20 flex-shrink-0'
                            to={`/${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`/${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatPrice(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatPrice(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          isDisabled={purchase.disabled}
                          max={purchase.product.quantity}
                          classWrapper=' w-[50px]'
                          classInput='bg-white text-sm text-center text-[#333] outline-none border-x border-x-solid border-gray-400 w-full h-[32px]'
                          setQuantity={handleUpdateQuantity(purchase.product._id)}
                          quantity={purchase.buy_count}
                          classContainer='flex items-center ml-4 border border-solid border-gray-400 rounded-sm'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>₫{formatPrice(purchase.product.price * purchase.buy_count)}</span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isCheckedAll}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchases.length})
            </button>
            <button className='mx-3 border-none bg-none'>Xóa</button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán (0 sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫138000</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫138000</div>
              </div>
            </div>
            <Button className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart