import React from 'react'
import { privateRoutesPath, publicRoutesPath } from '~/constants/routes.constant'
import MainLayout from '~/layouts/MainLayout'
import RegisterLayout from '~/layouts/RegisterLayout'
import { Login, Register, Profile, Cart } from '~/pages'

interface RoutesType {
  name: string
  path: string
  layout: React.ComponentType<any> | null
  component: React.ComponentType<any>
}

export const publicRoutes: RoutesType[] = [
  { name: 'register', path: publicRoutesPath.register, component: Register, layout: RegisterLayout },
  { name: 'login', path: publicRoutesPath.login, component: Login, layout: RegisterLayout }
]

export const privateRoutes: RoutesType[] = [
  { name: 'profile', path: privateRoutesPath.profile, component: Profile, layout: MainLayout },
  { name: 'cart', path: privateRoutesPath.cart, component: Cart, layout: MainLayout }
]
