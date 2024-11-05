export type ConfiguratorContextType = {
  fullName: string
  phoneNumber: string
  email: string
  manufacturerId: number
  serviceIds: string[]
  promoCode: string
  coupon: number
  note: string
  servicesList: Service[]
  manufacturerList: Manufacturer[]
}

export type Manufacturer = {
  id: number
  name: string
}

export type Service = {
  id: number
  name: string
  price: number
}
