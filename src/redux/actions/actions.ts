// src/redux/actions.ts
import { Action } from 'redux'
import { IProduct } from '../../constants/constants'

export enum ProductActionTypes {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT'
}

interface CreateProductAction
  extends Action<ProductActionTypes.CREATE_PRODUCT> {
  type: ProductActionTypes.CREATE_PRODUCT
  payload: IProduct
}

interface UpdateProductAction
  extends Action<ProductActionTypes.UPDATE_PRODUCT> {
  type: ProductActionTypes.UPDATE_PRODUCT
  payload: IProduct
}

interface DeleteProductAction
  extends Action<ProductActionTypes.DELETE_PRODUCT> {
  type: ProductActionTypes.DELETE_PRODUCT
  productId: string
}

export type ProductAction =
  | CreateProductAction
  | UpdateProductAction
  | DeleteProductAction

export const createProduct = (product: IProduct): CreateProductAction => ({
  type: ProductActionTypes.CREATE_PRODUCT,
  payload: product
})

export const updateProduct = (product: IProduct): UpdateProductAction => ({
  type: ProductActionTypes.UPDATE_PRODUCT,
  payload: product
})

export const deleteProduct = (productId: string): DeleteProductAction => ({
  type: ProductActionTypes.DELETE_PRODUCT,
  productId
})
