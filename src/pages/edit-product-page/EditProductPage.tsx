import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IProduct } from '../../constants/interfaces'
import styles from './EditProductPage.module.css'
import ProductForm from '../../components/products/product-form/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers/reducers'
import { updateProduct } from '../../redux/actions/actions'
import { ROUTES } from '../../constants/constants'
import { manufacturers } from '../../ProductsData'

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products)

  const [selectedManufacturerId, setSelectedManufacturerId] =
    useState<string>('')
  const [editedProduct, setEditedProduct] = useState<IProduct>({
    id: '',
    name: '',
    manufacturer: { id: '', name: '' },
    price: 0,
    expiryDate: new Date(),
  })

  useEffect(() => {
    const productToEdit = products.find((product) => product.id === id)
    if (productToEdit) {
      setEditedProduct(productToEdit)
      setSelectedManufacturerId(productToEdit.manufacturer.id)
    } else {
      navigate(ROUTES.PRODUCTS)
    }
  }, [id, products, navigate])

  const handleEditProduct = (product: IProduct) => {
    const updatedProduct: IProduct = {
      ...product,
      manufacturer: {
        id: selectedManufacturerId,
        name:
          manufacturers.find((m) => m.id === selectedManufacturerId)?.name ||
          '',
      },
    }

    dispatch(updateProduct(updatedProduct))
    navigate(ROUTES.PRODUCTS)
  }

  const handleCancel = () => {
    navigate(ROUTES.PRODUCTS)
  }

  return (
    <div className={styles.editProductPage}>
      <h3>Edit Product</h3>
      <ProductForm
        initialProduct={editedProduct}
        onSubmit={handleEditProduct}
        onCancel={handleCancel}
        setSelectedManufacturerId={setSelectedManufacturerId}
      />
    </div>
  )
}

export default EditProductPage
