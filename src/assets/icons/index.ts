import logoShopee from './logo.svg'
import search from './search.svg'
import global from './global.svg'
import cart from './cart.svg'
import chevronDown from './chevron-down.svg'
enum IconKeys {
  logoShopee = 'logoShopee',
  global = 'global',
  chevronDown = 'chevronDown',
  search = 'search',
  cart = 'cart'
}
type iconsType = {
  [key in IconKeys]: string
}
export const icons: iconsType = {
  logoShopee,
  global,
  chevronDown,
  search,
  cart
}
