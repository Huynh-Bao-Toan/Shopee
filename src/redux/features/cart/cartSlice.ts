import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { keyBy } from 'lodash'
import { ExtendedPurchase, Purchase } from '~/types/purchases.type'

// Define a type for the slice state
interface cartState {
  productListBuyNow: string[]
  extendedPurchases: ExtendedPurchase[]
}

// Define the initial state using that type
const initialState: cartState = {
  productListBuyNow: [],
  extendedPurchases: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProductListBuyNow: (state, action: PayloadAction<string>) => {
      state.productListBuyNow.push(action.payload)
    },
    removeAllProductListBuyNow: (state) => {
      state.productListBuyNow.splice(0, state.productListBuyNow.length)
    },
    setExtendedPurchases: (state, action: PayloadAction<{ purchasesInCart: Purchase[] }>) => {
      const extendedPurchasesObject = keyBy(state.extendedPurchases, '_id')
      state.extendedPurchases = action.payload.purchasesInCart?.map((purchase: any) => {
        const isPurchaseBuyNow = state.productListBuyNow.filter((product) => product === purchase._id)
        return {
          ...purchase,
          checked: Boolean(isPurchaseBuyNow.length > 0) || Boolean(extendedPurchasesObject[purchase._id]?.checked),
          disabled: false
        }
      })
    },
    checkProduct: (state, action: PayloadAction<{ index: number; checkedValue: boolean }>) => {
      state.extendedPurchases[action.payload.index].checked = action.payload.checkedValue
    },
    checkAllProduct: (state, action: PayloadAction<boolean>) => {
      state.extendedPurchases = state.extendedPurchases.map((purchase) => ({
        ...purchase,
        checked: !action.payload
      }))
    },
    updateProduct: (state, action) => {
      state.extendedPurchases = state.extendedPurchases.map((purchase) => {
        const isPurchase = purchase.product._id === action.payload.id
        return {
          ...purchase,
          buy_count: isPurchase ? action.payload.quantity : purchase.buy_count,
          disabled: true
        }
      })
    }
    // resetCart : (state) => {
    //   state.extendedPurchases = undefined
    // }
  }
})

export const {
  setProductListBuyNow,
  removeAllProductListBuyNow,
  setExtendedPurchases,
  checkProduct,
  checkAllProduct,
  updateProduct
} = cartSlice.actions
export default cartSlice.reducer
