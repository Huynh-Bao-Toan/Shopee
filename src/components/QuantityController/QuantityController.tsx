import { useState } from 'react'
import Button from '../Button/Button'
import InputNumber, { InputNumberProps } from '../InputNumber'
interface QuantityControllerProps extends InputNumberProps {
  isDisabled?: boolean
  max?: number | string
  min?: number | string
  classButton?: string
  classContainer?: string
  classWrapper?: string
  quantity?: number
  setQuantity?: (quantity: number) => void
}
function QuantityController(props: QuantityControllerProps) {
  const {
    isDisabled,
    classWrapper,
    setQuantity,
    min = 1,
    classInput = 'bg-white text-sm text-center text-[#333] outline-none border-x border-x-solid border-gray-400 w-[32px] h-[32px]',
    quantity,
    max = 10,
    classButton = 'flex items-center justify-center  p-1 bg-white text-sm text-center text-[#333] outline-none  w-[32px] h-[32px]',
    classContainer = 'flex items-center mr-4 border border-solid border-gray-400 rounded-sm',
    ...rest
  } = props
  const [localQuantity, setLocalQuantity] = useState<number>(quantity || 1)
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setQuantity && quantity) {
      if (quantity < Number(min)) {
        setQuantity(Number(min))
      } else if (quantity > Number(max)) {
        setQuantity(Number(max))
      } else setQuantity(Number(e.target.value))
    } else {
      if (localQuantity < Number(min)) {
        setLocalQuantity(Number(min))
      } else if (localQuantity > Number(max)) {
        setLocalQuantity(Number(max))
      } else setLocalQuantity(Number(e.target.value))
    }
  }
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setQuantity && quantity) {
      if (Number(e.target.value) < Number(min)) {
        setQuantity(Number(min))
      } else if (Number(e.target.value) > Number(max)) {
        setQuantity(Number(max))
      }
    } else {
      if (Number(e.target.value) < Number(min)) {
        setLocalQuantity(Number(min))
      } else if (Number(e.target.value) > Number(max)) {
        setLocalQuantity(Number(max))
      }
    }
  }
  const handleIncrease = () => {
    if (setQuantity && quantity) {
      let quantityCurrent = quantity + 1
      if (quantityCurrent > Number(max)) {
        quantityCurrent = Number(max)
      }
      setQuantity(quantityCurrent)
    } else {
      let quantityCurrent = localQuantity + 1
      if (quantityCurrent > Number(max)) {
        quantityCurrent = Number(max)
      }
      setLocalQuantity(quantityCurrent)
    }
  }
  const handleDecrease = () => {
    if (setQuantity && quantity) {
      let quantityCurrent = quantity - 1
      if (quantityCurrent < Number(min)) {
        quantityCurrent = Number(min)
      }
      setQuantity(quantityCurrent)
    } else {
      let quantityCurrent = localQuantity - 1
      if (quantityCurrent < Number(min)) {
        quantityCurrent = Number(min)
      }
      setLocalQuantity(quantityCurrent)
    }
  }
  return (
    <div className={classContainer}>
      <Button
        className={classButton}
        nameBtn='-'
        onClick={handleDecrease}
        disabled={isDisabled}
        style={{ cursor: isDisabled ? 'not-allowed' : '' }}
      />
      <InputNumber
        style={{ cursor: isDisabled ? 'not-allowed' : '' }}
        value={setQuantity ? quantity : localQuantity}
        classWrapper={classWrapper ? classWrapper : ''}
        classInput={classInput}
        classError='hidden'
        {...rest}
        onChange={handleChangeQuantity}
        onBlur={handleBlur}
        disabled={isDisabled}
      />
      <Button
        className={classButton}
        nameBtn='+'
        onClick={handleIncrease}
        disabled={isDisabled}
        style={{ cursor: isDisabled ? 'not-allowed' : '' }}
      />
    </div>
  )
}

export default QuantityController
