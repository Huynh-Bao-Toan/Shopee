import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import rulesForm from '~/utils/rulesForm'
import Input from '~/components/Input'
type Inputs = {
  email: string
  password: string
}
function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit
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
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white rounded-sm shadow-sm p-7 mb-10 mt-14 lg:mr-3 min-h-[350px]'
          >
            <div className='text-xl text-[#222] mb-5'>Đăng nhập</div>
            <div className='mt-4'>
              <Input
                errorMessage={errors.email?.message}
                name='email'
                type='email'
                placeholder='Nhập email'
                register={register}
                rules={rulesForm().email}
              />
              <Input
                errorMessage={errors.password?.message}
                name='password'
                type='password'
                placeholder='Nhập mật khẩu'
                register={register}
                rules={rulesForm().password}
              />
            </div>
            <button className='mt-2 uppercase rounded-sm p-2 bg-orange text-sm text-center text-white outline-none border-none w-full'>
              Đăng Nhập
            </button>

            <div className='text-center text-sm text-[#c7c7c7] mt-6 px-6'>
              Bạn mới biết đến Shopee?{' '}
              <Link to='/register' className='text-orange'>
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
