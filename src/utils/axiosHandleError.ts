import { isAxiosError, HttpStatusCode, AxiosError } from 'axios'
// function isAxiosErrorFunc <T> (error: unknown): error is AxiosError<T> {
// return isAxiosError(error)
// }
export function isAxiosUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && HttpStatusCode.UnprocessableEntity === 422
}
