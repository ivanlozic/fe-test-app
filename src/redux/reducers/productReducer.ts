import { Reducer } from 'redux'
import { ProductAction, ProductActionTypes } from '../actions/actions'
import { IProduct } from '../../constants/interfaces'

const initialState: IProduct[] = [
  {
    id: '1',
    name: 'Product 1',
    manufacturer: { id: '1', name: 'Manufacturer 1' },
    price: 10,
    expiryDate: new Date('2023-12-31')
  },
  {
    id: '2',
    name: 'Product 2',
    manufacturer: { id: '2', name: 'Manufacturer 2' },
    price: 20,
    expiryDate: new Date('2023-11-30')
  }
]

const productReducer: Reducer<IProduct[], ProductAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProductActionTypes.CREATE_PRODUCT:
      return [...state, action.payload]

    case ProductActionTypes.UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      )

    case ProductActionTypes.DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.productId)

    default:
      return state
  }
}

export default productReducer
