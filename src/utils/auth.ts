import { User } from '~/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const handleAddAccessToken = (body: string) => {
  localStorage.setItem('access_token', body)
}
export const handleAddRefreshToken = (body: string) => {
  localStorage.setItem('refresh_token', body)
}

export const handleGetAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}
export const handleGetRefreshToken = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const handleClearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user_info')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const handleAddUserProfile = (body: User) => {
  localStorage.setItem('user_info', JSON.stringify(body))
}
export function handleGetUserProfile() {
  const newProfile = localStorage.getItem('user_info')
  return newProfile ? JSON.parse(newProfile) : null
}
