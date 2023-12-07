import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/reducers/reducers'
import ProductItem from '../product-item/ProductItem'
import styles from './ProductList.module.css'
import { IProduct } from '../../../constants/interfaces'
import CreateProductModal from '../modals/create-product-modal/CreateProductModal'

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products)
    const [isCreateProductModalOpen, setCreateProductModalOpen] = useState(false);

  const handleEdit = (editedProduct: IProduct) => {
    console.log('Edited Product:', editedProduct)
  }

  const openCreateProductModal = () => {
    setCreateProductModalOpen(true);
  };

  const closeCreateProductModal = () => {
    setCreateProductModalOpen(false);
  };

  return (
    <div>
      <h2>Products</h2>
      <ul className={styles.productList}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onEdit={handleEdit} />
        ))}
      </ul>
      <button className={styles.addProduct} onClick={openCreateProductModal}>New Product</button>

      <CreateProductModal
        isOpen={isCreateProductModalOpen}
        onRequestClose={closeCreateProductModal}
      />
    </div>
  )
}

export default ProductList
