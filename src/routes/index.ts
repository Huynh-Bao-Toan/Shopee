import React from 'react'
import { publicRoutesPath } from '~/constants/routes.constant'
import RegisterLayout from '~/layouts/RegisterLayout'
import { Login, ProductList, Register } from '~/pages'

interface PublicRoutesType {
  name: string
  path: string
  layout: React.ComponentType<any> | null
  component: React.ComponentType<any>
}

export const publicRoutes: PublicRoutesType[] = [
  { name: 'product_list', path: publicRoutesPath.product_list, component: ProductList, layout: null },
  { name: 'register', path: publicRoutesPath.register, component: Register, layout: RegisterLayout },
  { name: 'login', path: publicRoutesPath.login, component: Login, layout: RegisterLayout }
]
