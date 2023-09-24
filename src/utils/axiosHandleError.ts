import { isAxiosError, HttpStatusCode, AxiosError } from 'axios'
// function isAxiosErrorFunc <T> (error: unknown): error is AxiosError<T> {
// return isAxiosError(error)
// }
export function isAxiosUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && HttpStatusCode.UnprocessableEntity === 422
}

export function isAxiosUnauthorizedError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<T>(error: unknown): error is AxiosError<T> {
  return (
    isAxiosUnauthorizedError<{ message: string; data?: { name: string; message: string } }>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}
