import { expect, describe, test } from 'vitest'
import { formatNumberToSocial, formatPrice } from '../formatPrice'

describe('format price', () => {
  test('formatPrice trả về số được định dạng đúng ngăn cách bởi dấu chấm', () => {
    expect(formatPrice(300000)).toBe('300.000')
  })
  test('formatNumberToSocial trả về số được định dạng đúng có đuôi là k', () => {
    expect(formatNumberToSocial(21000)).toBe('21k')
    expect(formatNumberToSocial(1000000)).toBe('1m')
  })
})
