import React, { ChangeEvent, useEffect, useState, useCallback } from 'react'
import { IProduct } from '../../../constants/interfaces'
import styles from './ProductForm.module.css'
import { manufacturers } from '../../../ProductsData'

interface IFormErrors {
  name: string
  manufacturer: string
  price: string
  expiryDate: string
}

interface IProductFormProps {
  initialProduct: IProduct
  onSubmit: (product: IProduct) => void
  onCancel: () => void
  setSelectedManufacturerId: (id: string) => void
}
const ProductForm: React.FC<IProductFormProps> = ({
  initialProduct,
  onSubmit,
  onCancel,
  setSelectedManufacturerId,
}) => {
  const [product, setProduct] = useState<IProduct>(initialProduct)
  const [formErrors, setFormErrors] = useState<IFormErrors>({
    name: '',
    manufacturer: '',
    price: '',
    expiryDate: '',
  })

  const validateForm = useCallback(() => {
    const errors: IFormErrors = {
      name: validateField('name', product.name),
      manufacturer: validateField(
        'manufacturer.name',
        product.manufacturer.name,
      ),
      price: validateField('price', product.price),
      expiryDate: validateField('expiryDate', product.expiryDate),
    }

    setFormErrors(errors)

    return Object.values(errors).every((error) => !error)
  }, [product])
  useEffect(() => {
    if (initialProduct.id !== product.id) {
      setProduct(initialProduct)
    }
  }, [initialProduct, product])

  useEffect(() => {
    validateForm()
  }, [validateForm, initialProduct])

  const validateField = (name: string, value: string | number | Date) => {
    let error = ''

    switch (name) {
      case 'name':
        if (!value.toString().trim()) {
          error = 'Name is required'
        }
        break
      case 'manufacturer.name':
        if (!value.toString().trim()) {
          error = 'Manufacturer Name is required'
        }
        break
      case 'price':
        if (value === '' || parseFloat(value.toString()) <= 0) {
          error = 'Price must be greater than 0'
        }
        break
      case 'expiryDate':
        if (!value || isNaN((value as Date).getTime())) {
          error = 'Expiry Date is required'
        }
        break
      default:
        break
    }
    return error
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    if (name.startsWith('manufacturer.')) {
      const [, manufacturerField] = name.split('.')
      const updatedManufacturer = {
        ...product.manufacturer,
        [manufacturerField]: value,
      }
      setSelectedManufacturerId(updatedManufacturer.name)
      setProduct((prevProduct) => ({
        ...prevProduct,
        manufacturer: updatedManufacturer,
      }))
    } else {
      const trimmedValue = value.trim()
      const newValue =
        name === 'expiryDate'
          ? trimmedValue === ''
            ? new Date()
            : new Date(trimmedValue)
          : name === 'price'
            ? trimmedValue === ''
              ? ''
              : parseFloat(trimmedValue) || 0
            : trimmedValue

      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: newValue,
      }))
    }

    if (
      name === 'manufacturer.name' ||
      name === 'expiryDate' ||
      name === 'price'
    ) {
      validateForm()
    }
  }

  const handleBlur = () => {
    validateForm()
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(product)
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Product Form</h3>

      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{formErrors.name}</span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Manufacturer Name:</label>
        <select
          className={styles.input}
          name="manufacturer.name"
          value={product.manufacturer.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
        >
          <option value="">Select Manufacturer</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </option>
          ))}
        </select>
        <span className={styles.error}>{formErrors.manufacturer}</span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Price:</label>
        <input
          className={styles.input}
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{formErrors.price}</span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Expiry Date:</label>
        <input
          className={styles.input}
          type="date"
          name="expiryDate"
          value={product.expiryDate.toISOString().split('T')[0]}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <span className={styles.error}>{formErrors.expiryDate}</span>
      </div>

      <button className={styles.button} onClick={handleSubmit}>
        Submit
      </button>
      <button
        className={`${styles.button} ${styles.cancel}`}
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  )
}

export default ProductForm
