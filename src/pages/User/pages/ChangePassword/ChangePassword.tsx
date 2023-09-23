import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { updateUser } from '~/apis/user.api'
import Button from '~/components/Button/Button'
import Input from '~/components/Input'
import { UpdateUserBody } from '~/types/user.type'
import { NoUndefinedField, ResponseApi } from '~/types/utils.type'
import { isAxiosUnprocessableEntityError } from '~/utils/axiosHandleError'
import { UserSchema, userSchema } from '~/utils/rulesForm'
import { ObjectSchema } from 'yup'
type FormData = NoUndefinedField<Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>>
const newPasswordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])
function ChangePassword() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(newPasswordSchema as ObjectSchema<FormData>)
  })
  const updateUserMutation = useMutation({
    mutationFn: (body: UpdateUserBody) => updateUser(body)
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateUserMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
        const formErr = error.response?.data.data
        if (formErr) {
          Object.keys(formErr).map((key) => {
            setError(key as keyof FormData, {
              message: formErr[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi Mật Khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                type='password'
                classInput='w-96 rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='password'
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu cũ'
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                type='password'
                classInput='w-96 rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='new_password'
                errorMessage={errors.new_password?.message}
                placeholder='Mật khẩu mới'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                type='password'
                classInput='w-96 rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='confirm_password'
                errorMessage={errors.confirm_password?.message}
                placeholder='Nhập lại mật khẩu mới'
              />
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='sm:w-[20%]' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                nameBtn='lưu'
                className=' capitalize rounded-sm px-5 py-4 bg-orange text-[12px] text-center text-white outline-none border-none hover:opacity-80'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
