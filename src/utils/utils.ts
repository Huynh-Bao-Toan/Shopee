export const calculatorDiscountPercent = (price: number, priceBeforeDiscount: number) => {
  return Math.round(((priceBeforeDiscount - price) * 100) / priceBeforeDiscount) + '%'
}
