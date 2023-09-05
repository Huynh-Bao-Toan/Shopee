enum PublicRoutesPath {
  register = 'register',
  login = 'login'
}

enum PrivateRoutesPath {
  profile = 'profile'
}

type RoutesPathType<T extends Record<string, string>> = {
  [key in keyof T]: string
}

export const publicRoutesPath: RoutesPathType<typeof PublicRoutesPath> = {
  register: '/register',
  login: '/login'
}

export const privateRoutesPath: RoutesPathType<typeof PrivateRoutesPath> = {
  profile: '/profile'
}
