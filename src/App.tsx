import './App.scss'
import ConfigWrapper from './components/ConfigWrapper'
import Page from './components/layout/Page'
import { ConfiguratorProvider } from './context/ConfiguratorContext'

function App() {
  const fields = {
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

  function validateFields(configurator: any) {
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
