import { IProduct } from '../../constants/interfaces'

enum ProductActionTypes {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

const createProduct = (product: IProduct) => ({
  type: ProductActionTypes.CREATE_PRODUCT as const,
  payload: product,
})

const updateProduct = (product: IProduct) => ({
  type: ProductActionTypes.UPDATE_PRODUCT as const,
  payload: product,
})

const deleteProduct = (productId: string) => ({
  type: ProductActionTypes.DELETE_PRODUCT as const,
  productId,
})

export type ProductAction =
  | ReturnType<typeof createProduct>
  | ReturnType<typeof updateProduct>
  | ReturnType<typeof deleteProduct>

export { createProduct, updateProduct, deleteProduct, ProductActionTypes }
