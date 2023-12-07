import React from 'react'

import styles from './ProductItem.module.css'
import { IProduct } from '../../../constants/interfaces'
import { ROUTES } from '../../../constants/constants'
import { Link } from 'react-router-dom'

interface ProductItemProps {
  product: IProduct
  onEdit: (editedProduct: IProduct) => void
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const editLink = `${ROUTES.EDIT_PRODUCT.replace(':id', product.id)}`
  return (
    <li className={styles.productItem}>
      <div>
        <strong>{product.name}</strong> - {product.manufacturer.name},{' '}
        {product.price} EUR, {product.expiryDate.toLocaleDateString('en-GB')}
      </div>
      <div>
        <Link to={editLink}>Edit</Link>
        <button>Delete</button>
      </div>
    </li>
  )
}

export default ProductItem
