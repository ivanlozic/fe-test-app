import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IManufacturer, IProduct } from '../../constants/interfaces'
import styles from './EditProductPage.module.css'

interface EditProductPageProps {
  onEdit: (editedProduct: IProduct) => void
}

const EditProductPage: React.FC<EditProductPageProps> = ({ onEdit }) => {
  const { id } = useParams<{ id: string }>()
  const [editedProduct, setEditedProduct] = useState<IProduct>({
    id: id || '',
    name: 'Sample Product',
    manufacturer: { name: 'Sample Manufacturer' } as IManufacturer,
    price: 10.99,
    expiryDate: new Date()
  })

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
    // You may want to redirect the user to another page after editing.
  }

  return (
    <div className={styles.EditProductPage}>
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
    </div>
  )
}

export default EditProductPage
