import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { rulesForm } from '~/utils/rulesForm'
type Inputs = {
  email: string
  password: string
  confirm_password: string
}
function Register() {
  //react-hook-form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    <div className='bg-orange w-full'>
      <div
        className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 bg-contain bg-no-repeat bg-center min-h-[600px]'
        style={{ backgroundImage: 'url(/src/assets/images/sg-11134004-7rbk0-lkqed7pgsfw7b1.png)' }}
      >
        <div className='lg:col-span-2 lg:col-start-4  '>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white rounded-sm shadow-sm p-7 mb-10 mt-14 lg:mr-3 min-h-[420px]'
          >
            <div className='text-xl text-[#222] mb-5'>Đăng ký</div>
            <div className='mt-4'>
              <div className='min-h-[70px] mb-1'>
                <input
                  type='text'
                  className=' border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5 '
                  placeholder='Nhập email'
                  {...register('email', rulesForm.email)}
                />
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>{errors.email?.message}</p>
              </div>
              <div className='min-h-[70px] mb-1'>
                <input
                  type='password'
                  className=' border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5 '
                  placeholder='Nhập mật khẩu'
                  {...register('password', rulesForm.password)}
                />
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>{errors.password?.message}</p>
              </div>
              <div className='min-h-[70px] mb-1'>
                <input
                  type='password'
                  className=' border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5 '
                  placeholder='Nhập lại mật khẩu'
                  {...register('confirm_password', {
                    ...rulesForm.confirm_password,
                    validate: (value) => value === getValues('password') || 'Mật khẩu không khớp'
                  })}
                />
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>{errors.confirm_password?.message}</p>
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
