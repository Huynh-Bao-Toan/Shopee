import Button from '../Button/Button'
import InputNumber, { InputNumberProps } from '../InputNumber'
interface QuantityControllerProps extends InputNumberProps {
  max: number
  classButton?: string
  classContainer?: string
  // increaseFunction?: () => void
  // decreaseFunction?: () => void
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  quantity: number
}
function QuantityController(props: QuantityControllerProps) {
  const {
    classInput = 'bg-white text-sm text-center text-[#333] outline-none border-x border-x-solid border-gray-400 w-[32px] h-[32px]',
    quantity,
    max,
    classButton = 'flex items-center justify-center  p-1 bg-white text-sm text-center text-[#333] outline-none  w-[32px] h-[32px]',
    classContainer = 'flex items-center mr-4 border border-solid border-gray-400 rounded-sm',
    setQuantity,
    ...rest
  } = props
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantity < 1) {
      setQuantity(1)
    } else if (quantity > max) {
      setQuantity(max)
    } else setQuantity(Number(e.target.value))
  }
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) {
      setQuantity(1)
    } else if (Number(e.target.value) > max) {
      setQuantity(max)
    }
  }
  const handleIncrease = () => {
    let quantityCurrent = quantity + 1
    if (quantityCurrent > max) {
      quantityCurrent = max
    } else quantityCurrent += 1
    setQuantity(quantityCurrent)
  }
  const handleDecrease = () => {
    let quantityCurrent = quantity - 1
    if (quantityCurrent < 1) {
      quantityCurrent = 1
    } else quantityCurrent -= 1
    setQuantity(quantityCurrent)
  }
  return (
    <div className={classContainer}>
      <Button className={classButton} nameBtn='-' onClick={handleDecrease} />
      <InputNumber
        value={quantity}
        classWrapper=''
        classInput={classInput}
        classError='hidden'
        {...rest}
        onChange={handleChangeQuantity}
        onBlur={handleBlur}
      />
      <Button className={classButton} nameBtn='+' onClick={handleIncrease} />
    </div>
  )
}

export default QuantityController
