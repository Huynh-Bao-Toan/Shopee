import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classWrapper?: string
  classError?: string
  classInput?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
function InputNumber(props: InputNumberProps) {
  const {
    errorMessage,
    onChange,
    classError = 'mt-1 text-sm text-red-600 dark:text-red-500',
    classWrapper = 'min-h-[70px] mb-1',
    classInput = 'border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5',
    ...rest
  } = props
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }
  return (
    <div className={classWrapper}>
      <input {...rest} className={classInput} onChange={handleChange} />
      <p className={classError}>{errorMessage}</p>
    </div>
  )
}

export default InputNumber
