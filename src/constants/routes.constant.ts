interface RoutesPathType {
  [key: string]: string
}

export const publicRoutesPath: RoutesPathType = {
  register: '/register',
  login: '/login'
}
export const privateRoutesPath: RoutesPathType = {
  profile: '/profile'
}
