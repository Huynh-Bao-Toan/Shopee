import { describe, it, expect } from 'vitest'
import {
  handleAddAccessToken,
  handleAddRefreshToken,
  handleAddUserProfile,
  handleClearLS,
  handleGetAccessToken,
  handleGetRefreshToken,
  handleGetUserProfile
} from '../auth'
const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjQ1ZDYyOTdlOTU5MDMzNzJmMTJkMiIsImVtYWlsIjoidG9hbjFAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0yNVQwMTo0NDoxMi41MTVaIiwiaWF0IjoxNjk1NjA2MjUyLCJleHAiOjE2OTU2OTI2NTJ9.6rqY7orBg-HGyWYjboqd3aNNyoWTpbbl-AqB9LDVF_0'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjQ1ZDYyOTdlOTU5MDMzNzJmMTJkMiIsImVtYWlsIjoidG9hbjFAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0yNVQwMTo0NDoxMi41MTVaIiwiaWF0IjoxNjk1NjA2MjUyLCJleHAiOjE3MDk0MzAyNTJ9.kcCIgwNDK5obk0f76V19WzFGZO7XXtkeN6bcEuKBxKc'
const user_info = JSON.parse(
  '{"_id":"64f45d6297e95903372f12d2","roles":["User"],"email":"toan1@gmail.com","createdAt":"2023-09-03T10:18:10.248Z","updatedAt":"2023-09-23T01:45:03.526Z","__v":0,"address":"250 Nguyễn Thượng Hiền, phường 5","date_of_birth":"2002-08-22T17:00:00.000Z","name":"Huỳnh Bảo Toàn","phone":"1234567890","avatar":"fb6e9e2c-19e3-494d-b3aa-48f02d815fde.png"}'
)
describe('check access_token', () => {
  it('add access_token & get access_token thành công', () => {
    handleAddAccessToken(access_token)
    expect(handleGetAccessToken()).toBe(access_token)
  })
})

describe('check refresh_token', () => {
  it('add refresh_token & get refresh_token thành công', () => {
    handleAddRefreshToken(refresh_token)
    expect(handleGetRefreshToken()).toBe(refresh_token)
  })
})

describe('clear localStorage', () => {
  it('clear localStorage thành công', () => {
    handleAddAccessToken(access_token)
    handleAddRefreshToken(refresh_token)
    handleAddUserProfile(user_info)
    handleClearLS()
    expect(handleGetRefreshToken()).toBe('')
    expect(handleGetAccessToken()).toBe('')
    expect(handleGetUserProfile()).toBe(null)
  })
})

describe('check user_profile', () => {
  it('add user_profile & get user_profile thành công', () => {
    handleAddUserProfile(user_info)
    expect(handleGetUserProfile()).toEqual(user_info)
  })
})
