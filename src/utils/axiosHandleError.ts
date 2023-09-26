import { isAxiosError, HttpStatusCode, AxiosError } from 'axios'

export function isAxiosUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
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
