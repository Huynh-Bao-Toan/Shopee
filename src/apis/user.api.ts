import { UpdateUserBody, User } from '~/types/user.type'
import { ResponseApi } from '~/types/utils.type'
import { http } from '~/utils/http'

export const getUser = () => http.get<ResponseApi<User>>('/me')

export const updateUser = (body: UpdateUserBody) => http.put<ResponseApi<User>>('/user', body)

export const uploadAvatar = (body: FormData) =>
  http.post<ResponseApi<string>>('/user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
