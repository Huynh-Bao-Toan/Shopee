export const handleAddAccessToken = (body: string) => {
  localStorage.setItem('access_token', body)
}

export const handleGetAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

export const handleRemoveAccessToken = () => {
  localStorage.removeItem('access_token')
}
