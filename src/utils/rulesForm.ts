import type { RegisterOptions } from 'react-hook-form'
type RulesForm = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
const rulesForm: RulesForm = {
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
    }
  }
}

export { rulesForm }
