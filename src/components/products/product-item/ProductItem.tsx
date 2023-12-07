import React, { useState } from 'react'

import EditModal from '../modals/edit-modal/EditModal'

import styles from './ProductItem.module.css'
import { IProduct } from '../../../constants/interfaces'

interface ProductItemProps {
  product: IProduct
  onEdit: (editedProduct: IProduct) => void
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onEdit }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  const openEditModal = () => {
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
  }

  const handleEdit = (editedProduct: IProduct) => {
    onEdit(editedProduct)
  }

  return (
    <li className={styles.productItem}>
      <div>
        <strong>{product.name}</strong> - {product.manufacturer.name},{' '}
        {product.price} EUR, {product.expiryDate.toLocaleDateString('en-GB')}
      </div>
      <div>
        <button onClick={openEditModal}>Edit</button>
        <button>Delete</button>
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        onEdit={handleEdit}
        product={product}
      />
    </li>
  )
}

export default ProductItem
