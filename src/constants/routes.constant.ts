export enum PublicRoutesPath {
  register = 'register',
  login = 'login'
}

export enum PrivateRoutesPath {
  profile = 'profile',
  cart = 'cart',
changePassword = 'changePassword',
historyPurchase = 'historyPurchase'
}

export type RoutesPathType<T> = {
  [key in keyof T]: string
}

export const publicRoutesPath: RoutesPathType<typeof PublicRoutesPath> = {
  register: '/register',
  login: '/login'
}

export const privateRoutesPath: RoutesPathType<typeof PrivateRoutesPath> = {
  profile: '/user/profile',
  cart: '/cart',
  historyPurchase: '/user/history-purchase',
  changePassword: '/user/change-password'
}
