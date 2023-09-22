import Avatar from '~/assets/images/avatar.png'
export const calculatorDiscountPercent = (price: number, priceBeforeDiscount: number) => {
  return Math.round(((priceBeforeDiscount - price) * 100) / priceBeforeDiscount) + '%'
}
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}
export const getAvatarUrl = (avatarName?: string) =>
  avatarName ? `https://api-ecom.duthanhduoc.com/images/${avatarName}` : Avatar
