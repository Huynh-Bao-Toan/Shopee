import { useForm, Controller } from 'react-hook-form'
import Input from '~/components/Input'
import Avatar from '~/assets/images/avatar.png'
import Button from '~/components/Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserSchema, userSchema } from '~/utils/rulesForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUser, updateUser } from '~/apis/user.api'
import InputNumber from '~/components/InputNumber'
import { useEffect } from 'react'
import DateSelect from '~/components/DateSelect'
import { UpdateUserBody } from '~/types/user.type'
import { toast } from 'react-toastify'
import { setUserInfo } from '~/redux/features/auth/authSlice'
import { useAppDispatch } from '~/hooks/useAppDispatch'
import { handleAddUserProfile } from '~/utils/auth'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

function Profile() {
  const dispatch = useAppDispatch()
  const updateUserMutation = useMutation({
    mutationFn: (body: UpdateUserBody) => updateUser(body)
  })
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    setError,
    control
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData, refetch: refetchProfileData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUser()
  })
  const profile = profileData?.data.data
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  const onSubmit = handleSubmit((data) => {
    updateUserMutation.mutate(
      { ...data, date_of_birth: data.date_of_birth?.toISOString() },
      {
        onSuccess: (res) => {
          handleAddUserProfile(res.data.data)
          dispatch(setUserInfo(res.data.data))
          refetchProfileData()
          toast.success(res.data.message)
        }
      }
    )
  })
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='name'
                errorMessage={errors.name?.message}
                placeholder='Tên'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => {
                  return (
                    <InputNumber
                      errorMessage={errors.phone?.message}
                      placeholder='Số điện thoại'
                      classInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                      onChange={(e) => {
                        field.onChange(e)
                      }}
                      value={field.value}
                    />
                  )
                }}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='address'
                errorMessage={errors.address?.message}
                placeholder='Địa chỉ'
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
            )}
          />
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
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img src={Avatar} alt='' className='w-full rounded-full object-cover' />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button
              type='button'
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
