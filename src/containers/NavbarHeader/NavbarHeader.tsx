import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { icons } from '~/assets/icons'
import Button from '~/components/Button/Button'
import Popover from '~/components/Popover'
import { privateRoutesPath, publicRoutesPath } from '~/constants/routes.constant'
import { useAppSelector } from '~/hooks/useAppSelector'
import { useAppDispatch } from '~/hooks/useAppDispatch'
import { setIsAuthenticated, setUserInfo } from '~/redux/features/auth/authSlice'
import { logoutAccount } from '~/apis/auth.api'
import { getAvatarUrl } from '~/utils/utils'

function NavbarHeader() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const userInfo = useAppSelector((state) => state.auth.userInfo)

  const logoutMutation = useMutation({
    mutationFn: () => {
      return logoutAccount()
    },
    onSuccess: () => {
      dispatch(setIsAuthenticated(false))
      dispatch(setUserInfo(null))
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-end items-center w-full h-9'>
      <Popover
        renderPopOver={
          <>
            <Button className='text-sm text-[#333] hover:text-orange mb-2' nameBtn='Tiếng Việt' />
            <Button className='text-sm text-[#333] hover:text-orange ' nameBtn='English' />
          </>
        }
        className='flex justify-around items-center w-28 h-8 cursor-pointer hover:opacity-70'
      >
        <img src={icons.global} alt='global-icon' className='w-4 h-4 ' />
        <span className='text-sm'>Tiếng Việt</span>
        <img src={icons.chevronDown} alt='chevron-down-icon' className='w-4 h-4' />
      </Popover>
      {isAuthenticated ? (
        <Popover
          className='flex justify-around items-center w-28 h-8 cursor-pointer hover:opacity-70 ml-4'
          renderPopOver={
            <>
              <Link to={privateRoutesPath.profile} className='capitalize text-sm text-[#333] hover:text-cyan-500 mb-2'>
                Tài khoản của tôi
              </Link>
              <Link to='' className='capitalize text-sm text-[#333] hover:text-cyan-500 mb-2'>
                Đơn mua
              </Link>
              <Button
                className='capitalize text-sm text-[#333] hover:text-cyan-500'
                nameBtn='Đăng xuất'
                onClick={handleLogout}
              />
            </>
          }
        >
          <img src={getAvatarUrl(userInfo?.avatar)} alt='avatar' className='w-6 h-6 object-cover rounded-full' />
          <span className='text-sm lowercase ml-2'>{userInfo?.email}</span>
        </Popover>
      ) : (
        <>
          <Link to={publicRoutesPath.register} className='text-sm cursor-pointer hover:opacity-70 mx-3'>
            Đăng Ký
          </Link>
          <div className='w-[1px] h-3 bg-white opacity-70' />
          <Link to={publicRoutesPath.login} className='text-sm cursor-pointer hover:opacity-70 ml-3'>
            Đăng Nhập
          </Link>
        </>
      )}
    </div>
  )
}

export default NavbarHeader
