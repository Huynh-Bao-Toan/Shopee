import logoShopee from './logo.svg'
import search from './search.svg'
import global from './global.svg'
import cart from './cart.svg'
import chevronDown from './chevron-down.svg'
import chevronLeft from './chevron-left.svg'
import chevronRight from './chevron-right.svg'
import starFill from './starFill.svg'
import listBullet from './listBullet.svg'
import funnel from './funnel.svg'
enum IconKeys {
  logoShopee = 'logoShopee',
  global = 'global',
  chevronDown = 'chevronDown',
  search = 'search',
  cart = 'cart',
  starFill = 'starFill',
  listBullet = 'listBullet',
  funnel = 'funnel',
  chevronLeft = 'chevronLeft',
  chevronRight = 'chevronRight'
}
type iconsType = {
  [key in IconKeys]: string
}
export const icons: iconsType = {
  logoShopee,
  global,
  chevronDown,
  search,
  cart,
  starFill,
  listBullet,
  funnel,
  chevronLeft,
  chevronRight
}
