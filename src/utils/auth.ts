import { User } from '~/types/user.type'

export const handleAddAccessToken = (body: string) => {
  localStorage.setItem('access_token', body)
}

export const handleGetAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

export const handleClearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user_info')
}

export const handleAddUserProfile = (body: User) => {
  localStorage.setItem('user_info', JSON.stringify(body))
}
export function handleGetUserProfile() {
  const newProfile = localStorage.getItem('user_info')
  return newProfile ? JSON.parse(newProfile) : null
}
