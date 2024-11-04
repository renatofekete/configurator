import Info from './Info'
import useMultiStep from '../hooks/useMultiStep'
import Form from './Form'
import FormConfirmation from './FormConfirmation'
import styles from './configWrapper.module.scss'
import { useConfiguratorContext } from '../context/ConfiguratorContext'
import useFetch from '../hooks/useFetch'

import Success from '../assets/icons/success-icon.svg?react'
import Tools from '../assets/icons/tools-icon.svg?react'

function ConfigWrapper() {
  const { validateFields, configurator } = useConfiguratorContext()

  const endpoint =
    'https://fe-interview-project-backend.accounts-a35.workers.dev/api/contact'

  const authToken = import.meta.env.VITE_X_AUTH_TOKEN

  const { callApi, errors } = useFetch(endpoint, authToken, 'POST')

  async function handlePost() {
    const data = {
      fullName: configurator.fullName,
      phoneNumber: configurator.phoneNumber,
      email: configurator.email,
      manufacturerId: configurator.manufacturerId,
      serviceIds: configurator.serviceIds,
      promoCode: configurator.promoCode,
      note: configurator.note,
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
      handleBeforeNext: validateFields,
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
          content='Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u najkraćem mogućem roku. Hvala vam!'
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
        <div>{step}</div>
        {currentElement}
        <div>{buttons()}</div>
      </div>
    </>
  )
}

export default ConfigWrapper
