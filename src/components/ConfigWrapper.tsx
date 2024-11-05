import { useEffect } from 'react'
import Info from './Info'
import useMultiStep from '../hooks/useMultiStep'
import Form from './Form'
import FormConfirmation from './FormConfirmation'
import styles from './configWrapper.module.scss'
import { useConfiguratorContext } from '../context/ConfiguratorContext'
import useFetch from '../hooks/useFetch'
import { ConfiguratorContextType } from '../types/types'
import Success from '../assets/icons/success-icon.svg?react'
import Tools from '../assets/icons/tools-icon.svg?react'
import { API } from '../utils/constants'

type dataValues = {
  fullName: string
  phoneNumber: string
  email: string
  manufacturerId: number
  serviceIds: string[]
  note: string
  promoCode?: string
}

function ConfigWrapper() {
  const { configurator, setConfigurator, setInvalidFields } =
    useConfiguratorContext<ConfiguratorContextType>()

  const {
    fullName = '',
    phoneNumber = '',
    email = '',
    manufacturerId = -1,
    serviceIds = [],
    note = '',
    promoCode = '',
  } = configurator || {}

  const endpoint = `${API}/contact`

  const authToken = import.meta.env.VITE_X_AUTH_TOKEN

  const { callApi, errors } = useFetch(endpoint, authToken, 'POST')

  const fields: ConfiguratorContextType = {
    fullName: '',
    phoneNumber: '',
    email: '',
    manufacturerId: -1,
    serviceIds: [],
    coupon: 0,
    promoCode: '',
    note: '',
    servicesList: [],
    manufacturerList: [],
  }

  function handleValidateFields() {
    const newInvalidFields = []

    if (!fullName) {
      newInvalidFields.push({
        field: 'fullName',
        message: 'Ime i prezime je obavezno',
      })
    }
    if (!phoneNumber) {
      newInvalidFields.push({
        field: 'phoneNumber',
        message: 'Broj telefona je obavezan',
      })
    }

    if (!email) {
      newInvalidFields.push({ field: 'email', message: 'Email je obavezan' })
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newInvalidFields.push({ field: 'email', message: 'Email nije ispravan' })
    }

    if (manufacturerId < 0) {
      newInvalidFields.push({
        field: 'manufacturerId',
        message: 'Proizvođač je obavezan',
      })
    }

    if (serviceIds.length === 0) {
      newInvalidFields.push({
        field: 'serviceIds',
        message: 'Bar jedna usluga je obavezna',
      })
    }

    setInvalidFields(newInvalidFields)
    return newInvalidFields.length === 0
  }

  useEffect(() => {
    setConfigurator(fields)
  }, [setConfigurator])

  async function handlePost() {
    const data: dataValues = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      manufacturerId: manufacturerId,
      serviceIds: serviceIds,
      note: note,
    }

    if (promoCode !== '') {
      data.promoCode = promoCode
    }

    const response = await callApi(data)
    return errors.length === 0 && response
  }

  const { step, buttons, currentElement } = useMultiStep([
    {
      component: (
        <Info
          icon={<Tools />}
          title='Konfigurator servisa'
          content='Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i naš stručan tim će vam se javiti u najkraćem mogućem roku.'
        />
      ),
      nextButton: 'Pokreni konfigurator',
    },
    {
      component: <Form />,
      nextButton: 'Nastavi',
      handleBeforeNext: handleValidateFields,
    },
    {
      component: <FormConfirmation />,
      nextButton: 'Pošalji',
      handleBeforeNext: handlePost,
    },
    {
      component: (
        <Info
          icon={<Success />}
          title='Vaša prijava je uspješno poslana'
          content={`Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u najkraćem mogućem roku. \nHvala vam!`}
        />
      ),
    },
  ])

  const isCentered = step === 0 || step === 3

  return (
    <>
      <div
        className={`${styles.wrapper} ${
          isCentered && styles['wrapper--center']
        }`}
      >
        {currentElement}
        <div className={styles.buttons}>{buttons()}</div>
      </div>
    </>
  )
}

export default ConfigWrapper
