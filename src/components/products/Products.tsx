import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/reducers/reducers'
import ProductItem from './product-item/ProductItem'
import styles from './Products.module.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/constants'

const Products: React.FC = () => {
  const products = useSelector((state: RootState) => state.products)

  return (
    <div>
      <h2>Products</h2>
      <Link to={ROUTES.CREATE_PRODUCT} className={styles.addProduct}>
        New Product
      </Link>
      <ul className={styles.productList}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  )
}

export default Products
