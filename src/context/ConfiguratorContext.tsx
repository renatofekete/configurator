import { createContext, useContext, ReactNode, useState } from 'react'

type Manufacturer = {
  id: number
  name: string
}

type Service = {
  id: number
  name: string
  price: number
}

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

type Error = {
  field: string
  message: string
}

type ConfiguratorContextValue = {
  configurator: ConfiguratorContextType
  setConfigurator: React.Dispatch<React.SetStateAction<ConfiguratorContextType>>
  invalidFields: Error[]
  validateFields: () => boolean
}

type ConfiguratorProviderProps<ConfiguratorContextType> = {
  children: ReactNode
  fields: ConfiguratorContextType
  handleValidation: (configurator: ConfiguratorContextType) => Error[]
}

const ConfiguratorContext = createContext<ConfiguratorContextValue | undefined>(
  undefined
)

export function ConfiguratorProvider({
  children,
  fields,
  handleValidation,
}: ConfiguratorProviderProps<any>) {
  const [configurator, setConfigurator] =
    useState<ConfiguratorContextType>(fields)

  const [invalidFields, setInvalidFields] = useState<Error[]>([])

  function validateFields() {
    const errors = handleValidation(configurator)
    setInvalidFields(errors)

    return errors.length === 0
  }

  function submitForm(data: any) {
    if (validateFields()) {
      console.log('Form submitted with data:', data)
    }
  }

  return (
    <ConfiguratorContext.Provider
      value={{
        configurator,
        setConfigurator,
        invalidFields,
        validateFields,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  )
}

export function useConfiguratorContext() {
  const context = useContext(ConfiguratorContext)
  if (!context) {
    throw new Error(
      'useConfiguratorContext must be used within a ConfiguratorContext.Provider'
    )
  }
  return context
}
