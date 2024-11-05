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

type Manufacturer = {
  id: number
  name: string
}

type Service = {
  id: number
  name: string
  price: number
}
