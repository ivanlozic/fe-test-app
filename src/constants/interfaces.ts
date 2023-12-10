export interface IProduct {
  id: string
  name: string
  manufacturer: IManufacturer
  price: number
  expiryDate: Date
}

export interface IManufacturer {
  id: string
  name: string
}
