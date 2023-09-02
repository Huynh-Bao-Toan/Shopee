import { ReactNode } from 'react'
import Footer from '~/containers/Footer'
import RegisterHeader from '~/containers/RegisterHeader/RegisterHeader'

export interface RegisterLayoutProps {
  children: ReactNode
}

function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div className=''>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}

export default RegisterLayout
