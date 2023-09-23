import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { getPurchases } from '~/apis/purchases.api'
import { purchasesStatus } from '~/constants/purchases.constants'
import { privateRoutesPath } from '~/constants/routes.constant'
import { useQueryParams } from '~/hooks/useQueryParams'
import { PurchaseListStatus } from '~/types/purchases.type'
import { formatPrice } from '~/utils/formatPrice'
import { generateNameId } from '~/utils/utils'
const purchasesTabs: { status: PurchaseListStatus; name: string }[] = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  {
    status: purchasesStatus.waitForConfirmation,
    name: 'Chờ xác nhận'
  },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  {
    status: purchasesStatus.inProgress,
    name: 'Đang giao'
  },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  {
    status: purchasesStatus.cancelled,
    name: 'Đã hủy'
  }
]
function HistoryPurchase() {
  const queryParams = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => getPurchases({ status: status as PurchaseListStatus })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  return (
    <>
      <div className='sticky rounded-sm bg-white shadow grid grid-cols-6 items-center'>
        {purchasesTabs.map((tab) => {
          return (
            <Link
              key={tab.status}
              to={`${privateRoutesPath.historyPurchase}?status=${tab.status}`}
              className={classNames('text-center text-sm   py-4 border-b border-b-solid ', {
                'text-orange border-b-orange': status ? tab.status === Number(status) || 0 : tab.status === 0,
                'text-[#333] border-b-transparent': status ? tab.status !== Number(status) : tab.status !== 0
              })}
            >
              {tab.name}
            </Link>
          )
        })}
      </div>
      <div>
        {purchasesInCart?.map((purchase) => (
          <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
            <Link to={`/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`} className='flex'>
              <div className='flex-shrink-0'>
                <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
              </div>
              <div className='ml-3 flex-grow overflow-hidden'>
                <div className='truncate'>{purchase.product.name}</div>
                <div className='mt-3'>x{purchase.buy_count}</div>
              </div>
              <div className='ml-3 flex-shrink-0'>
                <span className='truncate text-gray-500 line-through'>
                  ₫{formatPrice(purchase.product.price_before_discount)}
                </span>
                <span className='ml-2 truncate text-orange'>₫{formatPrice(purchase.product.price)}</span>
              </div>
            </Link>
            <div className='flex justify-end'>
              <div>
                <span>Tổng giá tiền</span>
                <span className='ml-4 text-xl text-orange'>
                  ₫{formatPrice(purchase.product.price * purchase.buy_count)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default HistoryPurchase
