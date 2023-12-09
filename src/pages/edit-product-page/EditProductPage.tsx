import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IManufacturer, IProduct } from '../../constants/interfaces'
import styles from './EditProductPage.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../../redux/reducers/productReducer'
import { ROUTES } from '../../constants/constants'

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [editedProduct, setEditedProduct] = useState<IProduct>({
    id: id || '',
    name: 'Sample Product',
    manufacturer: { name: 'Sample Manufacturer' } as IManufacturer,
    price: 10.99,
    expiryDate: new Date()
  })
  const products = useSelector(
    (state: { products: IProduct[] }) => state.products
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const productToEdit = products.find((product) => product.id === id)

    if (productToEdit) {
      setEditedProduct(productToEdit)
    }
  }, [id, products])
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
    dispatch(updateProduct(editedProduct))
    navigate(ROUTES.PRODUCTS)
    console.log('Edited')
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
