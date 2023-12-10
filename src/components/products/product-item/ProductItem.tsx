import React, { useState } from 'react'

import styles from './ProductItem.module.css'
import { IProduct } from '../../../constants/interfaces'
import { ROUTES } from '../../../constants/constants'
import { Link } from 'react-router-dom'
import ConfirmationModal from '../modals/confirmation-modal/ConfirmationModal'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../../redux/actions/actions'

interface ProductItemProps {
  product: IProduct
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const editLink = `${ROUTES.EDIT_PRODUCT.replace(':id', product.id)}`
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteProduct(product.id))
    setDeleteModalOpen(false)
  }
  return (
    <li className={styles.productItem}>
      <div>
        <strong>{product.name}</strong> - {product.manufacturer.name},{' '}
        {product.price} EUR, {product.expiryDate.toLocaleDateString('en-GB')}
      </div>
      <div>
        <Link to={editLink}>Edit</Link>
        <button onClick={() => setDeleteModalOpen(true)}>Delete</button>
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete ${product.name}?`}
        />
      </div>
    </li>
  )
}

export default ProductItem
