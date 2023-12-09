import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/reducers/reducers'
import ProductItem from '../product-item/ProductItem'
import styles from './ProductList.module.css'
import { IProduct } from '../../../constants/interfaces'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/constants'

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products)

  const handleEdit = (editedProduct: IProduct) => {
    console.log('Edited Product:', editedProduct)
  }

  return (
    <div>
      <h2>Products</h2>
      <ul className={styles.productList}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product}  onEdit={handleEdit} />
        ))}
      </ul>
      <Link to={ROUTES.CREATE_PRODUCT} className={styles.addProduct}>
        New Product
      </Link>
    </div>
  )
}

export default ProductList
