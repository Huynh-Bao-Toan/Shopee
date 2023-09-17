import { ReactNode } from 'react'
import UserSideNav from '~/containers/UserSideNav'

interface UserLayoutProps {
  children: ReactNode
}
function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className='py-5 grid grid-cols-12 gap-4 mx-auto max-w-7xl'>
      <div className='col-span-2'>
        <UserSideNav />
      </div>
      <div className='col-span-10'>{children}</div>
    </div>
  )
}

export default UserLayout
