export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-DE').format(price)
}

export const formatNumberToSocial = (sold: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 2
  })
    .format(sold)
    .toLowerCase()
}
