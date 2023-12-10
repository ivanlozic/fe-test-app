import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '../../constants/interfaces'
import styles from './CreateProductPage.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/reducers'
import { createProduct } from '../../redux/actions/actions'
import { ROUTES } from '../../constants/constants'

interface IFormErrors {
  name: string
  manufacturer: {
    id: string
    name: string
  }
  price: string
  expiryDate: string
}

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products)

  const [newProduct, setNewProduct] = useState<IProduct>({
    id: '',
    name: '',
    manufacturer: { id: '', name: '' },
    price: 0,
    expiryDate: new Date(),
  })

  const [formErrors, setFormErrors] = useState<IFormErrors>({
    name: '',
    manufacturer: {
      id: '',
      name: '',
    },
    price: '',
    expiryDate: '',
  })

  const generateNextProductId = () => {
    const existingIds = products.map((product) => parseInt(product.id, 10))
    const maxId = Math.max(...existingIds, 0)
    return (maxId + 1).toString()
  }

  const validateForm = () => {
    const errors: IFormErrors = {
      name: '',
      manufacturer: {
        id: '',
        name: '',
      },
      price: '',
      expiryDate: '',
    }

    if (!newProduct.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!newProduct.manufacturer.id.trim()) {
      errors.manufacturer.id = 'Manufacturer ID is required'
    }

    if (!newProduct.manufacturer.name.trim()) {
      errors.manufacturer.name = 'Manufacturer Name is required'
    }

    if (newProduct.price <= 0) {
      errors.price = 'Price must be greater than 0'
    }

    if (!newProduct.expiryDate || isNaN(newProduct.expiryDate.getTime())) {
      errors.expiryDate = 'Expiry Date is required'
    }

    setFormErrors(errors)

    return Object.values(errors).every((error) => !error)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.startsWith('manufacturer.')) {
      const [, manufacturerField] = name.split('.')
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        manufacturer: {
          ...prevProduct.manufacturer,
          [manufacturerField]: value,
        },
      }))
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: name === 'expiryDate' ? new Date(value) : value,
      }))
    }
  }

  const handleAddProduct = () => {
    if (validateForm()) {
      const nextProductId = generateNextProductId()
      const newProductWithId: IProduct = {
        ...newProduct,
        id: nextProductId,
      }

      dispatch(createProduct(newProductWithId))
      navigate(ROUTES.PRODUCTS)
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.PRODUCTS)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create Product</h3>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <span className={styles.error}>{formErrors.name}</span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Manufacturer ID:</label>
        <input
          className={styles.input}
          type="text"
          name="manufacturer.id"
          value={newProduct.manufacturer?.id || ''}
          onChange={handleInputChange}
        />
        <span className={styles.error}>{formErrors.manufacturer.id}</span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Manufacturer Name:</label>
        <input
          className={styles.input}
          type="text"
          name="manufacturer.name"
          value={newProduct.manufacturer?.name || ''}
          onChange={handleInputChange}
        />
        <span className={styles.error}>{formErrors.manufacturer.name}</span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Price:</label>
        <input
          className={styles.input}
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <span className={styles.error}>{formErrors.price}</span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Expiry Date:</label>
        <input
          className={styles.input}
          type="date"
          name="expiryDate"
          value={newProduct.expiryDate.toISOString().split('T')[0]}
          onChange={handleInputChange}
        />
        <span className={styles.error}>{formErrors.expiryDate}</span>
      </div>

      <button className={styles.button} onClick={handleAddProduct}>
        Add Product
      </button>
      <button className={styles.button} onClick={handleCancel}>
        Cancel
      </button>
    </div>
  )
}

export default CreateProductPage
