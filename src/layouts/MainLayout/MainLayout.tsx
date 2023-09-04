import { ReactNode } from 'react'
import Footer from '~/containers/Footer'
import MainHeader from '~/containers/MainHeader'
export interface MainLayoutProps {
  children: ReactNode
}
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className=''>
      <MainHeader />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
