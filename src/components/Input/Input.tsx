import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface InputProps {
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  errorMessage?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
}
function Input({ errorMessage, name, placeholder, register, type, rules }: InputProps) {
  return (
    <div className='min-h-[70px] mb-1'>
      <input
        type={type}
        className=' border border-gray-300 focus:border-gray-400 outline-none  text-sm rounded-lg  block w-full p-2.5 '
        placeholder={placeholder}
        {...register(name)}
      />
      <p className='mt-1 text-sm text-red-600 dark:text-red-500'>{errorMessage}</p>
    </div>
  )
}

export default Input
