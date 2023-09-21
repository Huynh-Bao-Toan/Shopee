type Roles = 'User' | 'Admin'
export interface User {
  roles: Roles[]
  _id: string
  email: string
  createdAt: string
  updatedAt: string
  name?: string
  date_of_birth?: string
  address?: string
  phone?: string
  avatar?: string
}

export interface UpdateUserBody extends Omit<User, '_id' | 'roles' | 'updatedAt' | 'createdAt' | 'email'> {
  password?: string
  new_password?: string
}
