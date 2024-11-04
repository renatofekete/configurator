import { useState, useEffect } from 'react'
import { useConfiguratorContext } from '../context/ConfiguratorContext'
import useConcurrentFetch from '../hooks/useConcurentFetch'
import Checkmark from '../assets/icons/checkmark-icon.svg?react'
import useFetch from '../hooks/useFetch'
import InputCmp from './ui/InputCmp'
import { calculateTotalPrice } from '../utils/price'

type Manufacturer = {
  id: number
  name: string
}

type Service = {
  id: number
  name: string
  price: number
}

function Form() {
  const { configurator, setConfigurator, invalidFields } =
    useConfiguratorContext()
  const [couponShown, setCouponShown] = useState(false)
  const [couponValue, setCouponValue] = useState('')

  const {
    manufacturerId,
    fullName,
    note,
    phoneNumber,
    email,
    serviceIds,
    manufacturerList,
    servicesList,
    promoCode,
    coupon,
  } = configurator

  const endpoints = [
    'https://fe-interview-project-backend.accounts-a35.workers.dev/api/manufacturers',
    'https://fe-interview-project-backend.accounts-a35.workers.dev/api/services',
  ]

  const couponEndpoint =
    'https://fe-interview-project-backend.accounts-a35.workers.dev/api/validate-promo-code'

  const authToken = import.meta.env.VITE_X_AUTH_TOKEN

  const { errors, loading, callApis } = useConcurrentFetch(endpoints, authToken)

  useEffect(() => {
    if (manufacturerList.length === 0 || servicesList.length === 0) {
      async function fetchData() {
        const data = await callApis()
        if (data) {
          const [manufacturers, services] = data
          setConfigurator((prev) => ({
            ...prev,
            manufacturerList: manufacturers,
            servicesList: services,
          }))
        }
      }

      fetchData()
    }
  }, [])

  const { callApi } = useFetch(
    `${couponEndpoint}/${couponValue}`,
    authToken,
    'POST'
  )

  const manufacturers = manufacturerList || []
  const services = servicesList || []

  if (loading) {
    return <div>Loading...</div>
  }
  if (errors.length) {
    return <div>Error!</div>
  }

  async function handleCouponCheck(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    const data = await callApi()
    if (data) {
      console.log(data)
      setConfigurator((prev) => ({
        ...prev,
        promoCode: data.code,
        coupon: data.discountPercentage,
      }))
    }
  }

  function handleCouponChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCouponValue(e.target.value)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    if (
      name === 'serviceIds' &&
      type === 'checkbox' &&
      e.target instanceof HTMLInputElement
    ) {
      const isChecked = e.target.checked

      setConfigurator((prev) => ({
        ...prev,
        serviceIds: isChecked
          ? [...prev.serviceIds, value]
          : prev.serviceIds.filter((service) => service !== value),
      }))
    } else {
      setConfigurator((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const getErrorMessage = (field: string) => {
    const error = invalidFields.find((error) => error.field === field)
    return error?.message
  }

  const price = calculateTotalPrice(servicesList, serviceIds, coupon)

  return (
    <form>
      <h4>Odaberite proizvođaća vašeg vozila</h4>
      <div>
        {manufacturers?.map((manufacturer: Manufacturer) => (
          <div key={manufacturer.id}>
            <label>
              <input
                type='radio'
                name='manufacturerId'
                checked={manufacturerId === manufacturer.id}
                value={manufacturer.id}
                onChange={handleChange}
              />
              {manufacturer.name}
            </label>
          </div>
        ))}
      </div>
      <h4>Odaberite jednu ili više usluga koju trebate</h4>
      <div>
        {services?.map((service: Service) => (
          <div key={service.id}>
            <label>
              <input
                type='checkbox'
                name='serviceIds'
                checked={serviceIds.includes(service.id.toString())}
                value={service.id}
                onChange={handleChange}
              />
              {service.name} - {service.price} €
            </label>
          </div>
        ))}
      </div>
      <div>
        <div>ukupno: {price.discountedPrice}€</div>
        <div>
          {couponShown ? (
            <div>
              <input
                type='text'
                name='coupon'
                value={couponValue}
                onChange={handleCouponChange}
              />
              <button onClick={handleCouponCheck}>
                <Checkmark />
              </button>
              {promoCode && <span>{promoCode}</span>}
            </div>
          ) : (
            <span onClick={() => setCouponShown(true)}>Imam kupon</span>
          )}
        </div>
      </div>
      <h4>Vaši podaci</h4>
      <InputCmp
        label='Ime i prezime:'
        placeholder='Unesite ime i prezime'
        name='fullName'
        value={fullName}
        handleChange={handleChange}
        errorMessage={getErrorMessage('fullName')}
      />
      <InputCmp
        label='Broj telefona:'
        placeholder='Unesite broj telefona'
        type='tel'
        name='phoneNumber'
        value={phoneNumber}
        handleChange={handleChange}
        errorMessage={getErrorMessage('phoneNumber')}
      />
      <InputCmp
        label='Email adresa:'
        placeholder='Unesite email adresu'
        type='email'
        name='email'
        value={email}
        handleChange={handleChange}
        errorMessage={getErrorMessage('email')}
      />
      <InputCmp
        label='Napomena (opcionalno):'
        placeholder='Unesite napomenu'
        as='textarea'
        name='note'
        value={note}
        handleChange={handleChange}
      />
    </form>
  )
}

export default Form
