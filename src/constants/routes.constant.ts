interface RoutesPathType {
  [key: string]: string
}

export const publicRoutesPath: RoutesPathType = {
  // product_list: '/',
  register: '/register',
  login: '/login'
}
export const privateRoutesPath: RoutesPathType = {
  profile: '/profile'
}
