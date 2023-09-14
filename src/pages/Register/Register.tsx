import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import Input from '~/components/Input'
import { RegisterSchema, schema } from '~/utils/rulesForm'
import { registerAccount } from '~/apis/auth.api'
import { isAxiosUnprocessableEntityError } from '~/utils/axiosHandleError'
import { ResponseApi } from '~/types/utils.type'
import { useAppDispatch } from '~/hooks/useAppDispatch'
import { setIsAuthenticated, setUserInfo } from '~/redux/features/auth/authSlice'
import { publicRoutesPath } from '~/constants/routes.constant'
import Button from '~/components/Button/Button'
import shopeeBg from '~/assets/images/sg-11134004-7rbk0-lkqed7pgsfw7b1.png'
type Inputs = RegisterSchema
function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  //react-hook-form
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<RegisterSchema, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const registerData = omit(data, ['confirm_password'])
    registerMutation.mutate(registerData, {
      onSuccess: (res) => {
        dispatch(setIsAuthenticated(true))
        dispatch(setUserInfo(res.data.data.user))
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<RegisterSchema, 'confirm_password'>>>(error)) {
          const formErr = error.response?.data.data
          //handle err 2
          if (formErr) {
            Object.keys(formErr).map((key) => {
              setError(key as keyof Omit<RegisterSchema, 'confirm_password'>, {
                message: formErr[key as keyof Omit<RegisterSchema, 'confirm_password'>],
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
        style={{ backgroundImage: `${shopeeBg}` }}
      >
        <div className='lg:col-span-2 lg:col-start-4  '>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white rounded-sm shadow-sm p-7 mb-10 mt-14 lg:mr-3 min-h-[420px]'
          >
            <div className='text-xl text-[#222] mb-5'>Đăng ký</div>
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
              <Input
                errorMessage={errors.confirm_password?.message}
                name='confirm_password'
                type='password'
                placeholder='Nhập lại mật khẩu'
                register={register}
              />
            </div>
            {!registerMutation.isLoading ? (
              <Button nameBtn='Đăng Ký' />
            ) : (
              <Button
                nameBtn='Đăng Ký'
                className='mt-2 uppercase rounded-sm p-2 bg-orange text-sm text-center text-white outline-none border-none w-full cursor-not-allowed'
                disabled
              />
            )}

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
              <Link to={publicRoutesPath.login} className='text-orange'>
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
