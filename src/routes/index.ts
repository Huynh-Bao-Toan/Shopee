import React, { lazy } from 'react'
import { privateRoutesPath, publicRoutesPath } from '~/constants/routes.constant'
import CartLayout from '~/layouts/CartLayout'
import MainLayout from '~/layouts/MainLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
// import {  Login,Register, Profile, Cart, ChangePassword, HistoryPurchase } from '~/pages'
import UserLayout from '~/pages/User/layouts/UserLayout/UserLayout'
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Profile = lazy(() => import('../pages/User/pages/Profile'))
const Cart = lazy(() => import('../pages/Cart'))
const ChangePassword = lazy(() => import('../pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('../pages/User/pages/HistoryPurchase'))
interface RoutesType {
  name: string
  path: string
  layout: React.ComponentType<any> | null
  component: React.ComponentType<any>
  childrenLayout: React.ComponentType<any> | null
}

export const publicRoutes: RoutesType[] = [
  {
    name: 'register',
    path: publicRoutesPath.register,
    component: Register,
    layout: RegisterLayout,
    childrenLayout: null
  },
  {
    name: 'login',
    path: publicRoutesPath.login,
    component: Login,
    layout: RegisterLayout,
    childrenLayout: null
  }
]

export const privateRoutes: RoutesType[] = [
  {
    name: 'profile',
    path: privateRoutesPath.profile,
    component: Profile,
    layout: MainLayout,
    childrenLayout: UserLayout
  },
  {
    name: 'cart',
    path: privateRoutesPath.cart,
    component: Cart,
    layout: CartLayout,
    childrenLayout: null
  },
  {
    name: 'history-purchase',
    path: privateRoutesPath.historyPurchase,
    component: HistoryPurchase,
    layout: MainLayout,
    childrenLayout: UserLayout
  },
  {
    name: 'change-password',
    path: privateRoutesPath.changePassword,
    component: ChangePassword,
    layout: MainLayout,
    childrenLayout: UserLayout
  }
]
