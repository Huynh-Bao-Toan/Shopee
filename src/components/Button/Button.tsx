import { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  nameBtn?: string
  children?: ReactNode
}

function Button(props: ButtonProps) {
  const {
    nameBtn,
    children,
    className = 'mt-2 uppercase rounded-sm p-2 bg-orange text-sm text-center text-white outline-none border-none w-full',
    ...rest
  } = props
  return (
    <button className={className} {...rest}>
      {nameBtn ? nameBtn : children}
    </button>
  )
}

export default Button
