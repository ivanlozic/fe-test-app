import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '../../constants/interfaces'
import styles from './CreateProductPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/reducers'
import { createProduct } from '../../redux/actions/actions'
import { ROUTES } from '../../constants/constants'
import { manufacturers } from '../../ProductsData'
import ProductForm from '../../components/products/product-form/ProductForm'

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products)

  const [selectedManufacturerId, setSelectedManufacturerId] =
    useState<string>('')
  const [newProduct] = useState<IProduct>({
    id: '',
    name: '',
    manufacturer: { id: '', name: '' },
    price: 0,
    expiryDate: new Date(),
  })

  const generateNextProductId = () => {
    const existingIds = products.map((product) => parseInt(product.id, 10))
    const maxId = Math.max(...existingIds, 0)
    return (maxId + 1).toString()
  }

  const handleAddProduct = (product: IProduct) => {
    const nextProductId = generateNextProductId()
    const newProductWithId: IProduct = {
      ...product,
      manufacturer: {
        id: selectedManufacturerId,
        name:
          manufacturers.find((m) => m.id === selectedManufacturerId)?.name ||
          '',
      },
      id: nextProductId,
    }

    dispatch(createProduct(newProductWithId))
    navigate(ROUTES.PRODUCTS)
  }

  const handleCancel = () => {
    navigate(ROUTES.PRODUCTS)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create Product</h3>
      <ProductForm
        initialProduct={newProduct}
        onSubmit={handleAddProduct}
        onCancel={handleCancel}
        setSelectedManufacturerId={setSelectedManufacturerId}
      />
    </div>
  )
}

export default CreateProductPage
