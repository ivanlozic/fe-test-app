import React, { ChangeEvent, useState } from 'react'
import Modal from 'react-modal'
import styles from './CreateProductModal.module.css'
import { IProduct } from '../../../../constants/interfaces'

Modal.setAppElement('#root')

interface CreateProductModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onRequestClose
}) => {
  const [newProduct, setNewProduct] = useState<IProduct>({
    id: '',
    name: '',
    manufacturer: { id: '', name: '' },
    price: 0,
    expiryDate: new Date()
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'expiryDate' ? new Date(value) : value
    }));
  };
  const handleAddProduct = () => {
    console.log('new product')
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Create Product Modal'
      className={styles.CreateProductModal}
    >
      <h3>Create Product</h3>
      <label>Name:</label>
      <input
        type='text'
        name='name'
        value={newProduct.name}
        onChange={handleInputChange}
      />

      <label>Manufacturer ID:</label>
      <input
        type='text'
        name='manufacturerId'
        value={newProduct.manufacturer?.id || ''}
        onChange={handleInputChange}
      />

      <label>Manufacturer Name:</label>
      <input
        type='text'
        name='manufacturerName'
        value={newProduct.manufacturer?.name || ''}
        onChange={handleInputChange}
      />

      <label>Price:</label>
      <input
        type='number'
        name='price'
        value={newProduct.price}
        onChange={handleInputChange}
      />

      <label>Expiry Date:</label>
      <input
        type='date'
        name='expiryDate'
        value={newProduct.expiryDate.toISOString().split('T')[0]}
        onChange={handleInputChange}
      />

      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  )
}

export default CreateProductModal
