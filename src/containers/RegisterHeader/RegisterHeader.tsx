import { Link } from 'react-router-dom'
import { icons } from '~/assets/icons'

function RegisterHeader() {
  return (
    <header className='p-4'>
      <div className='max-w-7xl mx-auto flex justify-between bg-white items-center'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img src={icons.logoIcon} alt='logo-shopee' className='h-6 fill-orange lg:h-10' />
          </Link>
          <span className='text-[#222] text-2xl ml-4'>Đăng nhập</span>
        </nav>
        <Link to='/' className='text-orange text-sm no-underline'>
          Bạn cần giúp đỡ?
        </Link>
      </div>
    </header>
  )
}

export default RegisterHeader
