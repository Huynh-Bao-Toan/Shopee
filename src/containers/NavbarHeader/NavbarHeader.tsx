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
import { useTranslation } from 'react-i18next'
import { allLanguage } from '~/i18n'

function NavbarHeader() {
  const dispatch = useAppDispatch()
  const { i18n, t } = useTranslation(['main_header'])
  const currentLng = i18n.language
  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
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
            <Button
              className='text-sm text-[#333] hover:text-orange mb-2'
              nameBtn='Tiếng Việt'
              onClick={() => handleChangeLanguage('vi')}
            />
            <Button
              className='text-sm text-[#333] hover:text-orange '
              nameBtn='English'
              onClick={() => handleChangeLanguage('en')}
            />
          </>
        }
        className='flex justify-around items-center w-28 h-8 cursor-pointer hover:opacity-70'
      >
        <img src={icons.global} alt='global-icon' className='w-4 h-4 ' />
        <span className='text-sm capitalize'>{allLanguage[currentLng as keyof typeof allLanguage]}</span>
        <img src={icons.chevronDown} alt='chevron-down-icon' className='w-4 h-4' />
      </Popover>
      {isAuthenticated ? (
        <Popover
          className='flex justify-around items-center w-28 h-8 cursor-pointer hover:opacity-70 ml-4'
          renderPopOver={
            <>
              <Link to={privateRoutesPath.profile} className='capitalize text-sm text-[#333] hover:text-cyan-500 mb-2'>
                {t('account.my account')}
              </Link>
              <Link
                to={privateRoutesPath.historyPurchase}
                className='capitalize text-sm text-[#333] hover:text-cyan-500 mb-2'
              >
                {t('account.my purchase')}
              </Link>
              <Button
                className='capitalize text-sm text-[#333] hover:text-cyan-500'
                nameBtn={t('account.logout')}
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
          <Link to={publicRoutesPath.register} className='capitalize text-sm cursor-pointer hover:opacity-70 mx-3'>
            {t('account.register')}
          </Link>
          <div className='w-[1px] h-3 bg-white opacity-70' />
          <Link to={publicRoutesPath.login} className='capitalize text-sm cursor-pointer hover:opacity-70 ml-3'>
            {t('account.login')}
          </Link>
        </>
      )}
    </div>
  )
}

export default NavbarHeader
