import { describe, expect, it } from 'vitest'
import {
  isAxiosExpiredTokenError,
  isAxiosUnauthorizedError,
  isAxiosUnprocessableEntityError
} from '../axiosHandleError'
import { AxiosError, HttpStatusCode } from 'axios'

describe('is Axios Unprocessable Entity Error', () => {
  it('is Axios Unprocessable Entity Error trả về boolean', () => {
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.BadGateway,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})

describe('is Axios Unauthorized Error', () => {
  it('is Axios Unauthorized Error trả về boolean', () => {
    expect(
      isAxiosUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.BadGateway,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})

describe('is Axios Expired Token Error', () => {
  it('is Axios Expired Token Error trả về false khi data có name không phải EXPIRED_TOKEN', () => {
    expect(
      isAxiosExpiredTokenError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized,
          data: {
            data: {
              name: 'abc'
            }
          }
        } as any)
      )
    ).toBe(false)
  })
  it('is Axios Expired Token Error trả về true', () => {
    expect(
      isAxiosExpiredTokenError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized,
          data: {
            data: {
              name: 'EXPIRED_TOKEN'
            }
          }
        } as any)
      )
    ).toBe(true)
  })
})
