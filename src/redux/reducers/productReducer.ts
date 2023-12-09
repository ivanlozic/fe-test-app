import { Reducer } from 'redux';
import { IProduct } from '../../constants/interfaces';

// Action types
enum ProductActionTypes {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

// Action creators
const createProduct = (product: IProduct) => ({
  type: ProductActionTypes.CREATE_PRODUCT as const,
  payload: product,
});

const updateProduct = (product: IProduct) => ({
  type: ProductActionTypes.UPDATE_PRODUCT as const,
  payload: product,
});

const deleteProduct = (productId: string) => ({
  type: ProductActionTypes.DELETE_PRODUCT as const,
  productId,
});

type ProductAction =
  | ReturnType<typeof createProduct>
  | ReturnType<typeof updateProduct>
  | ReturnType<typeof deleteProduct>;

const initialState: IProduct[] = [
  {
    id: '1',
    name: 'Product 1',
    manufacturer: { id: '1', name: 'Manufacturer 1' },
    price: 10,
    expiryDate: new Date('2023-12-31'),
  },
  {
    id: '2',
    name: 'Product 2',
    manufacturer: { id: '2', name: 'Manufacturer 2' },
    price: 20,
    expiryDate: new Date('2023-11-30'),
  },
];

const productReducer: Reducer<IProduct[], ProductAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProductActionTypes.CREATE_PRODUCT:
      return [...state, action.payload];

    case ProductActionTypes.UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );

    case ProductActionTypes.DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.productId);

    default:
      return state;
  }
};

export { createProduct, updateProduct, deleteProduct };
export default productReducer;
