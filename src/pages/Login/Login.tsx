import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Input from '~/components/Input'
import { LoginSchema, loginSchema } from '~/utils/rulesForm'
import { loginAccount } from '~/apis/auth.api'
import { ResponseApi } from '~/types/utils.type'
import { isAxiosUnprocessableEntityError } from '~/utils/axiosHandleError'
import { useAppDispatch } from '~/hooks/useAppDispatch'
import { setIsAuthenticated } from '~/redux/features/auth/authSlice'

type Inputs = LoginSchema
function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: Inputs) => loginAccount(body)
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        dispatch(setIsAuthenticated(true))
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Inputs>>(error)) {
          const formErr = error.response?.data.data
          //handle err 2
          if (formErr) {
            Object.keys(formErr).map((key) => {
              setError(key as keyof Inputs, {
                message: formErr[key as keyof Inputs],
                type: 'Server'
              })
            })
          }
          //handle err 1
          /*
          if (formErr?.email) {
            setError('email', {
              message: formErr.email,
              type: 'Server'
            })
          }
          if (formErr?.password) {
            setError('password', {
              message: formErr.password,
              type: 'Server'
            })
          }
         */
        }
      }
    })
  }
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
              />
              <Input
                errorMessage={errors.password?.message}
                name='password'
                type='password'
                placeholder='Nhập mật khẩu'
                register={register}
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
