import { describe, it, expect, beforeEach } from 'vitest'
import { Http, http } from '../http'
import { handleAddAccessToken, handleAddRefreshToken } from '../auth'

describe('http axios', () => {
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xNVQxNDowMzoyMy41NzdaIiwiaWF0IjoxNjcxMTEzMDAzLCJleHAiOjE2NzExMTMwMDR9.-gQIpbbKFlRqBlpiiAOBD4puP8jcMtZ2lobXPcy1zmU'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xNVQxNDowNTozNS41MTVaIiwiaWF0IjoxNjcxMTEzMTM1LCJleHAiOjE3NTc1MTMxMzV9.OHDBqBjhih1fgNe6-mWo0PQ-IcukNz4ljlXUCxM-8V8'
  beforeEach(() => {
    localStorage.clear()
  })
  it('gọi API', async () => {
    const productAPI = await http.get('/products')
    expect(productAPI.statusText).toBe('OK')
  })
  it('test đăng nhập', async () => {
    const httpNew = new Http().instance
    const formData = {
      email: 'toan1@gmail.com',
      password: '123456789'
    }
    const res = await httpNew.post('/login', formData)
    expect(res.data.message).toBe('Đăng nhập thành công')
  })
  it('test refresh token tự động', async () => {
    handleAddAccessToken(access_token_1s)
    handleAddRefreshToken(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('/me')
    expect(res.data.message).toBe('Lấy người dùng thành công')
  })
})
