import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { RootState } from '~/redux/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
