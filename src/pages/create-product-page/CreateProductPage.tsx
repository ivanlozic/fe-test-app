import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../constants/interfaces';
import styles from './CreateProductPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/reducers';
import { createProduct } from '../../redux/actions/actions';
import { ROUTES } from '../../constants/constants';
import { manufacturers } from '../../ProductsData';

interface IFormErrors {
  name: string;
  manufacturer: string;
  price: string;
  expiryDate: string;
}

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  const [selectedManufacturerId, setSelectedManufacturerId] = useState<string>('');
  const [newProduct, setNewProduct] = useState<IProduct>({
    id: '',
    name: '',
    manufacturer: { id: '', name: '' },
    price: 0,
    expiryDate: new Date(),
  });

  const [formErrors, setFormErrors] = useState<IFormErrors>({
    name: '',
    manufacturer: '',
    price: '',
    expiryDate: '',
  });

  const validateForm = useCallback(() => {
    const errors: IFormErrors = {
      name: validateField('name', newProduct.name),
      manufacturer: validateField('manufacturer.name', newProduct.manufacturer.name),
      price: validateField('price', newProduct.price),
      expiryDate: validateField('expiryDate', newProduct.expiryDate),
    };

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  }, [newProduct]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const generateNextProductId = () => {
    const existingIds = products.map((product) => parseInt(product.id, 10));
    const maxId = Math.max(...existingIds, 0);
    return (maxId + 1).toString();
  };

  const validateField = (name: string, value: string | number | Date) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.toString().trim()) {
          error = 'Name is required';
        }
        break;
      case 'manufacturer.name':
        if (!value.toString().trim()) {
          error = 'Manufacturer Name is required';
        }
        break;
      case 'price':
        if (value === '' || parseFloat(value.toString()) <= 0) {
          error = 'Price must be greater than 0';
        }
        break;
      case 'expiryDate':
        if (!value || isNaN((value as Date).getTime())) {
          error = 'Expiry Date is required';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setNewProduct((prevProduct) => {
      if (name.startsWith('manufacturer.')) {
        const [, manufacturerField] = name.split('.');
        return {
          ...prevProduct,
          manufacturer: {
            ...prevProduct.manufacturer,
            [manufacturerField]: value,
          },
        };
      } else {
        const trimmedValue = value.trim();
        const newValue =
          name === 'expiryDate'
            ? trimmedValue === ''
              ? new Date()
              : new Date(trimmedValue)
            : name === 'price'
            ? trimmedValue === ''
              ? ''
              : parseFloat(trimmedValue) || 0
            : trimmedValue;

        return {
          ...prevProduct,
          [name]: newValue,
        };
      }
    });

    if (name === 'expiryDate' || name === 'price') {
      validateForm();
    }
  };

  const handleBlur = () => {
    validateForm();
  };

  const handleAddProduct = () => {
    const nextProductId = generateNextProductId();
    const newProductWithId: IProduct = {
      ...newProduct,
      manufacturer: {
        id: selectedManufacturerId,
        name: manufacturers.find((m) => m.id === selectedManufacturerId)?.name || '',
      },
      id: nextProductId,
    };

    if (validateForm()) {
      dispatch(createProduct(newProductWithId));
      navigate(ROUTES.PRODUCTS);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.PRODUCTS);
  };

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
          onBlur={handleBlur}
        />
        <span className={styles.error}>{formErrors.name}</span>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Manufacturer Name:</label>
        <select
          className={styles.input}
          name="manufacturer.name"
          value={selectedManufacturerId}
          onChange={(e) => {
            setSelectedManufacturerId(e.target.value);
            handleInputChange(e);
          }}
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
          value={newProduct.price}
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
          value={newProduct.expiryDate.toISOString().split('T')[0]}
          onChange={handleInputChange}
          onBlur={handleBlur}
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
  );
};

export default CreateProductPage;
