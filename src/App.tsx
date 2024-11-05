import './App.scss'
import ConfigWrapper from './components/ConfigWrapper'
import Page from './components/layout/Page'
import { ConfiguratorProvider } from './context/ConfiguratorContext'
import { ConfiguratorContextType } from './types/types'

function App() {
  const fields: ConfiguratorContextType = {
    fullName: '',
    phoneNumber: '',
    email: '',
    manufacturerId: null,
    serviceIds: [],
    coupon: 0,
    promoCode: '',
    note: '',
    servicesList: [],
    manufacturerList: [],
  }

  function validateFields(configurator: ConfiguratorContextType) {
    const newInvalidFields = []

    if (!configurator.fullName) {
      newInvalidFields.push({ field: 'fullName', message: 'Name is required' })
    }
    if (!configurator.phoneNumber) {
      newInvalidFields.push({
        field: 'phoneNumber',
        message: 'Telephone is required',
      })
    }
    if (!configurator.email) {
      newInvalidFields.push({ field: 'email', message: 'Email is required' })
    }

    if (!configurator.manufacturerId) {
      newInvalidFields.push({
        field: 'manufacturerId',
        message: 'Manufacturer is required',
      })
    }

    if (configurator.serviceIds.length === 0) {
      newInvalidFields.push({
        field: 'serviceIds',
        message: 'At least one service is required',
      })
    }
    return newInvalidFields
  }

  return (
    <>
      <Page>
        <ConfiguratorProvider fields={fields} handleValidation={validateFields}>
          <ConfigWrapper />
        </ConfiguratorProvider>
      </Page>
    </>
  )
}

export default App
