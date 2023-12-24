import { Reducer } from 'redux'
import { IProduct } from '../../constants/interfaces'
import { pharmacyProducts } from '../../ProductsData'
import { ProductAction, ProductActionTypes } from '../actions/actions'

const initialState: IProduct[] = pharmacyProducts

const productReducer: Reducer<IProduct[], ProductAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ProductActionTypes.CREATE_PRODUCT:
      return [...state, action.payload]

    case ProductActionTypes.UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      )

    case ProductActionTypes.DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.productId)

    default:
      return state
  }
}

export default productReducer
