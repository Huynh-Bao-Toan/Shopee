import { ReactNode } from 'react'

export interface RegisterLayoutProps {
  children: ReactNode
}

function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div className=''>
      <h1>register Layout</h1>
      {children}
    </div>
  )
}

export default RegisterLayout
