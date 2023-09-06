import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classWrapper?: string
  classError?: string
  classInput?: string
}
function Input(props: InputProps) {
  const {
    errorMessage,
    name,
    register,
    rules,
    classError = 'mt-1 text-sm text-red-600 dark:text-red-500',
    classWrapper = 'min-h-[70px] mb-1',
    classInput = 'border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5',
    ...rest
  } = props
  const registerResult = name && register ? register(name) : {}
  return (
    <div className={classWrapper}>
      <input {...registerResult} {...rest} className={classInput} />
      <p className={classError}>{errorMessage}</p>
    </div>
  )
}

export default Input
