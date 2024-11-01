import Info from './Info'
import useMultiStep from '../hooks/useMultiStep'
import Form from './Form'
import FormConfirmation from './FormConfirmation'
import styles from './configWrapper.module.scss'
import { ConfiguratorProvider } from '../context/ConfiguratorContext'

import Success from '../assets/icons/success-icon.svg?react'
import Tools from '../assets/icons/tools-icon.svg?react'

function ConfigWrapper() {
  function test() {
    return true
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
    { component: <Form />, nextButton: 'Započni', handleBeforeNext: test },
    { component: <FormConfirmation />, nextButton: 'Dalje' },
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
    <ConfiguratorProvider>
      <div
        className={`${styles.wrapper} ${
          isCentered && styles['wrapper--center']
        }`}
      >
        <div>{step}</div>
        {currentElement}
        <div>{buttons()}</div>
      </div>
    </ConfiguratorProvider>
  )
}

export default ConfigWrapper
