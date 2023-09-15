import { ReactNode } from 'react'
import CartHeader from '~/containers/CartHeader'
import Footer from '~/containers/Footer'
export interface CartLayoutProps {
  children: ReactNode
}
function CartLayout({ children }: CartLayoutProps) {
  return (
    <div className=''>
      <CartHeader />
      <div className=' bg-gray-200'>{children}</div>
      <Footer />
    </div>
  )
}

export default CartLayout
