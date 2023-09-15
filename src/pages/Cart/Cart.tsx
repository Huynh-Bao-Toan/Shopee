import { useMutation, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { buyProducts, deletePurchases, getPurchases, updatePurchases } from '~/apis/purchases.api'
import Button from '~/components/Button/Button'
import QuantityController from '~/components/QuantityController'
import { purchasesStatus } from '~/constants/purchases.constants'
import { Purchase } from '~/types/purchases.type'
import { formatPrice } from '~/utils/formatPrice'
import { generateNameId } from '~/utils/utils'
import { produce } from 'immer'
import { compact, keyBy, sumBy } from 'lodash'
import MessageModal from '~/components/MessageModal'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import noProductImage from '~/assets/images/noProduct.png'
interface ExtendedPurchase extends Purchase {
  checked: boolean
  disabled: boolean
}
function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const { data: purchasesInCartData, refetch: RefetchpurchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => updatePurchases(body),
    onSuccess: () => {
      RefetchpurchasesInCartData()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: (body: string[]) => deletePurchases(body),
    onSuccess: () => {
      RefetchpurchasesInCartData()
    }
  })

  const buyPurchaseMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }[]) => buyProducts(body),
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
  const isCheckedAll =
    extendedPurchases.length > 0 ? extendedPurchases.every((purchase) => purchase.checked === true) : false

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
    updatePurchaseMutation.mutate({ product_id: id, buy_count: quantity })
  }

  const handleDeleteProduct = (id: string) => {
    deletePurchaseMutation.mutate([id])
  }
  const handleMultipleDeleteProduct = () => {
    const body = compact(
      extendedPurchases.map((purchase) => {
        if (purchase.checked) {
          return purchase._id
        }
      })
    )
    deletePurchaseMutation.mutate(body, {
      onSuccess: () => setVisibleModal(false)
    })
  }
  const handleBuyProduct = () => {
    const body = compact(
      extendedPurchases.map((purchase) => {
        if (purchase.checked) {
          return { product_id: purchase.product._id, buy_count: purchase.buy_count }
        }
      })
    )
    buyPurchaseMutation.mutate(body, {
      onSuccess: (data) =>
        toast(data.data.message, {
          autoClose: 1000
        }),
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.status === 422) {
          toast.error('Chưa có sản phẩm nào được chọn', {
            autoClose: 2000
          })
        }
      }
    })
  }
  return (
    <div className='bg-neutral-100 py-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className={`h-5 w-5 accent-orange ${extendedPurchases.length > 0 ? '' : 'cursor-not-allowed'}`}
                      checked={isCheckedAll}
                      onChange={handleCheckAll}
                      disabled={extendedPurchases.length > 0 ? false : true}
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
              {extendedPurchases.length > 0 ? (
                extendedPurchases?.map((purchase, index) => (
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
                                className='line-clamp-2 text-left'
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
                          <span className='text-orange'>
                            ₫{formatPrice(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button
                            className='bg-none text-black transition-colors hover:text-orange'
                            onClick={() => handleDeleteProduct(purchase._id)}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='w-full flex justify-center'>
                  <img src={noProductImage} alt='no-product' />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className={`h-5 w-5 accent-orange ${extendedPurchases.length > 0 ? '' : 'cursor-not-allowed'} `}
                checked={isCheckedAll}
                onChange={handleCheckAll}
                disabled={extendedPurchases.length > 0 ? false : true}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchases.length})
            </button>
            <button className='mx-3 border-none bg-none' onClick={() => setVisibleModal(!visibleModal)}>
              Xóa
            </button>
            {extendedPurchases.some((purchase) => purchase.checked) ? (
              <MessageModal
                visible={visibleModal}
                setVisible={setVisibleModal}
                renderAction={
                  <>
                    <button
                      data-modal-hide='popup-modal'
                      type='button'
                      className='uppercase text-white bg-orange hover:bg-orange/90  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                      onClick={() => setVisibleModal(false)}
                    >
                      trở lại
                    </button>
                    <button
                      data-modal-hide='popup-modal'
                      type='button'
                      className='uppercase
             text-gray-500 bg-white hover:bg-gray-100  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 '
                      onClick={handleMultipleDeleteProduct}
                    >
                      có
                    </button>
                  </>
                }
              >
                <svg
                  className='mx-auto mb-4 text-gray-400 w-12 h-12 '
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
                <h3 className='mb-5 text-lg font-normal text-gray-500 '>
                  Bạn có muốn bỏ {extendedPurchases.filter((purchase) => purchase.checked).length} sản phẩm?
                </h3>
              </MessageModal>
            ) : (
              <MessageModal
                visible={visibleModal}
                setVisible={setVisibleModal}
                renderAction={
                  <>
                    <button
                      data-modal-hide='popup-modal'
                      type='button'
                      className='uppercase text-white bg-orange hover:bg-orange/90  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                      onClick={() => setVisibleModal(false)}
                    >
                      trở lại
                    </button>
                  </>
                }
              >
                <svg
                  className='mx-auto mb-4 text-gray-400 w-12 h-12 '
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
                <h3 className='mb-5 text-lg font-normal text-gray-500 '>Chưa có sản phẩm nào được chọn</h3>
              </MessageModal>
            )}
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán ({extendedPurchases.filter((purchase) => purchase.checked).length} sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>
                  ₫
                  {formatPrice(
                    sumBy(
                      extendedPurchases.filter((purchase) => purchase.checked),
                      (purchase) => purchase.price * purchase.buy_count
                    )
                  )}
                </div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>
                  ₫
                  {formatPrice(
                    sumBy(
                      extendedPurchases.filter((purchase) => purchase.checked),
                      (purchase) => (purchase.price_before_discount - purchase.price) * purchase.buy_count
                    )
                  )}
                </div>
              </div>
            </div>
            <Button
              className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
              onClick={handleBuyProduct}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
