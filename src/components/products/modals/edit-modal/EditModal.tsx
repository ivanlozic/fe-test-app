import React, { ChangeEvent, useState } from 'react'
import Modal from 'react-modal'
import { IProduct, IManufacturer } from '../../../../constants/interfaces'
import styles from './EditModal.module.css'

Modal.setAppElement('#root')

interface EditModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onEdit: (editedProduct: IProduct) => void
  product: IProduct
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onRequestClose,
  onEdit,
  product
}) => {
  const [editedProduct, setEditedProduct] = useState(product)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'manufacturer') {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        manufacturer: { name: value } as IManufacturer
      }))
    } else {
      setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
    }
  }

  const handleEdit = () => {
    onEdit(editedProduct)
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Edit Product Modal'
      className={styles.EditModal}
    >
      <h3>Edit Product</h3>
      <label>Name:</label>
      <input
        type='text'
        name='name'
        value={editedProduct.name}
        onChange={handleInputChange}
      />

      <label>Manufacturer:</label>
      <input
        type='text'
        name='manufacturer'
        value={editedProduct.manufacturer?.name || ''}
        onChange={handleInputChange}
      />

      <label>Price:</label>
      <input
        type='number'
        name='price'
        value={editedProduct.price}
        onChange={handleInputChange}
      />

      <label>Expiry Date:</label>
      <input
        type='date'
        name='expiryDate'
        value={editedProduct.expiryDate.toISOString().split('T')[0]}
        onChange={handleInputChange}
      />

      <button onClick={handleEdit}>Save</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  )
}

export default EditModal
