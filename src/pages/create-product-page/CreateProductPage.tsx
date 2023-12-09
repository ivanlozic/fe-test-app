import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '../../constants/interfaces'
import styles from './CreateProductPage.module.css'
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/reducers/productReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/reducers';

const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products);
  
    const [newProduct, setNewProduct] = useState<IProduct>({
      id: '',
      name: '',
      manufacturer: { id: '', name: '' },
      price: 0,
      expiryDate: new Date(),
    });

    const generateNextProductId = () => {
      const existingIds = products.map((product) => parseInt(product.id, 10));
      const maxId = Math.max(...existingIds, 0);
      return (maxId + 1).toString();
    };

    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
      
        if (name.startsWith('manufacturer.')) {
          const [, manufacturerField] = name.split('.');
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            manufacturer: {
              ...prevProduct.manufacturer,
              [manufacturerField]: value,
            },
          }));
        } else {
        
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'expiryDate' ? new Date(value) : value,
          }));
        }
      };
  
    const handleAddProduct = () => {
      const nextProductId = generateNextProductId();
      const newProductWithId: IProduct = {
        ...newProduct,
        id: nextProductId,
      };
  
      console.log('new product:', newProduct);
      dispatch(createProduct(newProductWithId));
      navigate('/products');
    };
  
    const handleCancel = () => {
      
      navigate('/products');
    };
  
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Create Product</h3>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            className={styles.input}
            type='text'
            name='name'
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>
  
        <div className={styles.formGroup}>
          <label className={styles.label}>Manufacturer ID:</label>
          <input
            className={styles.input}
            type='text'
            name='manufacturer.id'
            value={newProduct.manufacturer?.id || ''}
            onChange={handleInputChange}
          />
        </div>
  
        <div className={styles.formGroup}>
          <label className={styles.label}>Manufacturer Name:</label>
          <input
            className={styles.input}
            type='text'
            name='manufacturer.name'
            value={newProduct.manufacturer?.name || ''}
            onChange={handleInputChange}
          />
        </div>
  
        <div className={styles.formGroup}>
          <label className={styles.label}>Price:</label>
          <input
            className={styles.input}
            type='number'
            name='price'
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>
  
        <div className={styles.formGroup}>
          <label className={styles.label}>Expiry Date:</label>
          <input
            className={styles.input}
            type='date'
            name='expiryDate'
            value={newProduct.expiryDate.toISOString().split('T')[0]}
            onChange={handleInputChange}
          />
        </div>
  
        <button className={styles.button} onClick={handleAddProduct}>
          Add Product
        </button>
        <button className={styles.button} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    );
  };
  
  export default CreateProductPage;