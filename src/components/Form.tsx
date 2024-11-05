import { useState, useEffect } from 'react'
import { useConfiguratorContext } from '../context/ConfiguratorContext'
import { calculateTotalPrice } from '../utils/price'
import { ConfiguratorContextType } from '../types/types'
import useConcurrentFetch from '../hooks/useConcurentFetch'
import Checkmark from '../assets/icons/checkmark-icon.svg?react'
import Ecs from '../assets/icons/ecs-icon.svg?react'
import useFetch from '../hooks/useFetch'
import InputCmp from './ui/InputCmp'
import ButtonCmp from './ui/ButtonCmp'
import ErrorMessageCmp from './ui/ErrorMessageCmp'
import BadgeCmp from './ui/BadgeCmp'
import styles from './form.module.scss'
import { Manufacturer, Service } from '../types/types'
import { API } from '../utils/constants'

function Form() {
  const { configurator, setConfigurator, invalidFields } =
    useConfiguratorContext<ConfiguratorContextType>()

  if (!configurator) {
    return <div>Loading...</div>
  }
  const [couponShown, setCouponShown] = useState(false)
  const [couponValue, setCouponValue] = useState('')
  const [couponError, setCouponError] = useState('')

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

  const endpoints = [`${API}/manufacturers`, `${API}/services`]

  const couponEndpoint = `${API}/validate-promo-code`

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
  }, [manufacturerList.length, servicesList.length, setConfigurator])

  const { callApi } = useFetch(
    `${couponEndpoint}/${couponValue}`,
    authToken,
    'POST'
  )

  const manufacturers = manufacturerList || []
  const services = servicesList || []

  async function handleCouponCheck(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    const data = await callApi()
    if (data) {
      setConfigurator((prev) => ({
        ...prev,
        promoCode: data.code,
        coupon: data.discountPercentage,
      }))
      setCouponValue('')
      setCouponError('')
    } else {
      setCouponError('Kod nije valjan')
    }
  }

  function handleCouponRemove() {
    setConfigurator((prev) => ({
      ...prev,
      promoCode: '',
      coupon: 0,
    }))
  }

  function handleCouponChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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

  if (loading) {
    return <div>Loading...</div>
  }
  if (errors.length) {
    return <div>Error!</div>
  }

  return (
    <form className={styles.form}>
      <h4>Odaberite proizvođaća vašeg vozila</h4>
      <section>
        <div className={styles.radio}>
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
        {getErrorMessage('manufacturerId') && (
          <ErrorMessageCmp errorMessage={getErrorMessage('manufacturerId')!} />
        )}
      </section>
      <h4>Odaberite jednu ili više usluga koju trebate</h4>
      <section>
        <div className={styles.checkbox}>
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
                {service.name} <span>({service.price}€)</span>
              </label>
            </div>
          ))}
        </div>
        {getErrorMessage('serviceIds') && (
          <ErrorMessageCmp errorMessage={getErrorMessage('serviceIds')!} />
        )}
      </section>
      <div className={styles.coupon}>
        <div className={styles.price}>
          ukupno: <span>{price.discountedPrice}</span>
        </div>
        <div className={styles.couponForm}>
          {couponShown ? (
            <div>
              <InputCmp
                name='coupon'
                value={couponValue}
                handleChange={handleCouponChange}
                placeholder='Unesi kod'
                errorMessage={couponError}
              />
              <ButtonCmp
                handleClick={handleCouponCheck}
                icon={<Checkmark />}
                variant='primary'
                size='icon'
              />
            </div>
          ) : (
            <span onClick={() => setCouponShown(true)}>Imam kupon</span>
          )}
          {promoCode && (
            <div className={styles.couponBadge}>
              <BadgeCmp
                text={promoCode}
                icon={<Ecs />}
                handleClick={handleCouponRemove}
              />
            </div>
          )}
        </div>
      </div>
      <h4>Vaši podaci</h4>
      <div className={styles.fields}>
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
      </div>
      <div className={styles.fields}>
        <InputCmp
          label='Email adresa:'
          placeholder='Unesite email adresu'
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          errorMessage={getErrorMessage('email')}
        />
      </div>
      <div className={styles.fields}>
        <InputCmp
          label='Napomena (opcionalno):'
          placeholder='Unesite napomenu'
          as='textarea'
          name='note'
          value={note}
          handleChange={handleChange}
        />
      </div>
    </form>
  )
}

export default Form
