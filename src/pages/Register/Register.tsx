import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='bg-orange w-full'>
      <div
        className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 bg-contain bg-no-repeat bg-center min-h-[600px]'
        style={{ backgroundImage: 'url(/src/assets/images/sg-11134004-7rbk0-lkqed7pgsfw7b1.png)' }}
      >
        <div className='lg:col-span-2 lg:col-start-4  '>
          <form className='bg-white rounded-sm shadow-sm p-7 mb-10 mt-14 lg:mr-3 min-h-[420px]'>
            <div className='text-xl text-[#222] mb-5'>Đăng ký</div>
            <div className='mt-4'>
              <div className='min-h-[70px] mb-1'>
                <input
                  type='text'
                  name='email'
                  className=' border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5 '
                  placeholder='Nhập email'
                />
                {/* <p className='mt-2 text-sm text-red-600 dark:text-red-500'>Email không hợp lệ</p> */}
              </div>
              <div className='min-h-[70px] mb-1'>
                <input
                  type='password'
                  name='password'
                  className=' border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5 '
                  placeholder='Nhập mật khẩu'
                />
                {/* <p className='mt-2 text-sm text-red-600 dark:text-red-500'>Mật khẩu không hợp lệ</p> */}
              </div>
              <div className='min-h-[70px] mb-1'>
                <input
                  type='password'
                  name='confirm_password'
                  className=' border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5 '
                  placeholder='Nhập lại mật khẩu'
                />
                {/* <p className='mt-2 text-sm text-red-600 dark:text-red-500'>Mật khẩu không khớp</p> */}
              </div>
            </div>
            <button className='uppercase rounded-sm p-2 bg-orange text-sm text-center text-white outline-none border-none w-full'>
              Đăng Ký
            </button>
            <div className='text-center text-sm text-[#222] mt-2 px-6'>
              Bằng việc đăng kí, bạn đã đồng ý với Shopee về{' '}
              <Link to='*' className='no-underline text-orange'>
                Điều khoản dịch vụ
              </Link>{' '}
              &{' '}
              <Link to='*' className='no-underline text-orange'>
                Chính sách bảo mật
              </Link>
            </div>
            <div className='text-center text-sm text-[#c7c7c7] mt-2 px-6'>
              Bạn đã có tài khoản?{' '}
              <Link to='/login' className='text-orange'>
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
