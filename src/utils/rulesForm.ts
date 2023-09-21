import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type RulesForm = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
//default validate
export const rulesForm = (getValues?: UseFormGetValues<any>): RulesForm => ({
  email: {
    required: { value: true, message: 'Email không được bỏ trống' },
    maxLength: {
      value: 160,
      message: 'Email không được quá 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Email từ 5-160 ký tự'
    },
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Email không đúng định dạng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu không được quá 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu từ 6-160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu không được quá 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu từ 6-160 ký tự'
    },
    validate: (value) => {
      if (getValues) {
        return value === getValues('password') || 'Mật khẩu không khớp'
      } else undefined
    }
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email không được bỏ trống')
    .max(160, 'Email không được quá 160 ký tự')
    .min(5, 'Email từ 5-160 ký tự')
    .email('Email không đúng định dạng'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .max(160, 'Mật khẩu không được quá 160 ký tự')
    .min(6, 'Mật khẩu từ 6-160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc')
    .max(160, 'Mật khẩu không được quá 160 ký tự')
    .min(6, 'Mật khẩu từ 6-160 ký tự')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})
export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password']
})

export const loginSchema = schema.pick(['email', 'password'])
export const priceSchema = schema.pick(['price_max', 'price_min'])
export const searchSchema = schema.pick(['name'])

export type RegisterSchema = yup.InferType<typeof schema>
export type SearchSchema = yup.InferType<typeof searchSchema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type PriceSchema = yup.InferType<typeof priceSchema>
export type UserSchema = yup.InferType<typeof userSchema>
