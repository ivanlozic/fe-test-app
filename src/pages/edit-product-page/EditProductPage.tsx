import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IManufacturer, IProduct } from '../../constants/interfaces'
import styles from './EditProductPage.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { ROUTES } from '../../constants/constants'
import { updateProduct } from '../../redux/actions/actions'

interface IFormErrors {
  name: string
  manufacturer: string
  price: string
  expiryDate: string
}

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [editedProduct, setEditedProduct] = useState<IProduct>({
    id: id || '',
    name: 'Sample Product',
    manufacturer: { name: 'Sample Manufacturer' } as IManufacturer,
    price: 10.99,
    expiryDate: new Date(),
  })
  const products = useSelector(
    (state: { products: IProduct[] }) => state.products,
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState<IFormErrors>({
    name: '',
    manufacturer: '',
    price: '',
    expiryDate: '',
  })

  useEffect(() => {
    const productToEdit = products.find((product) => product.id === id)

    if (productToEdit) {
      setEditedProduct(productToEdit)
    }
  }, [id, products])
  const validateForm = useCallback((product: IProduct) => {
    const errors: IFormErrors = {
      name: '',
      manufacturer: '',
      price: '',
      expiryDate: '',
    }

    if (product.name.trim() === '') {
      errors.name = 'Name is required'
    }

    if (product.manufacturer.name.trim() === '') {
      errors.manufacturer = 'Manufacturer is required'
    }

    if (product.price <= 0) {
      errors.price = 'Price must be greater than 0'
    }

    if (!product.expiryDate || isNaN(product.expiryDate.getTime())) {
      errors.expiryDate = 'Expiry Date is required'
    }

    setFormErrors(errors)

    return Object.values(errors).every((error) => !error)
  }, [])

  useEffect(() => {
    validateForm(editedProduct)
  }, [editedProduct, validateForm])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setEditedProduct((prevProduct) => {
      if (name === 'manufacturer') {
        return {
          ...prevProduct,
          manufacturer: { name: value } as IManufacturer,
        }
      } else if (name === 'expiryDate') {
        return {
          ...prevProduct,
          expiryDate: new Date(value),
        }
      } else {
        return { ...prevProduct, [name]: value }
      }
    })
  }

  useEffect(() => {
    validateForm(editedProduct)
  }, [editedProduct, validateForm])

  const handleEdit = () => {
    if (validateForm(editedProduct)) {
      dispatch(updateProduct(editedProduct))
      navigate(ROUTES.PRODUCTS)
    }
  }

  return (
    <div className={styles.editProductPage}>
      <h3>Edit Product</h3>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
          />
          <span className={styles.error}>{formErrors.name}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="manufacturer">Manufacturer:</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={editedProduct.manufacturer?.name || ''}
            onChange={handleInputChange}
          />
          <span className={styles.error}>{formErrors.manufacturer}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
          <span className={styles.error}>{formErrors.price}</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={editedProduct.expiryDate.toISOString().split('T')[0]}
            onChange={handleInputChange}
          />
          <span className={styles.error}>{formErrors.expiryDate}</span>
        </div>

        <button type="button" onClick={handleEdit}>
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProductPage
