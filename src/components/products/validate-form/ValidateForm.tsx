import { IProduct } from "../../../constants/interfaces";

export interface IFormErrors {
    name: string;
    manufacturer: string;
    price: string;
    expiryDate: string;
  }
  
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
  
  const validateForm = (product: IProduct): IFormErrors => {
    const errors: IFormErrors = {
      name: validateField('name', product.name),
      manufacturer: validateField('manufacturer.name', product.manufacturer.name),
      price: validateField('price', product.price),
      expiryDate: validateField('expiryDate', product.expiryDate),
    };
  
    return errors;
  };
  
  export { validateForm };