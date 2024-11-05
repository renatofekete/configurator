import { createContext, useContext, ReactNode, useState } from 'react'

type Error = {
  field: string
  message: string
}

type ConfiguratorContextValue<T> = {
  configurator: T
  setConfigurator: React.Dispatch<React.SetStateAction<T>>
  invalidFields: Error[]
  validateFields: () => boolean
}

type ConfiguratorProviderProps<T> = {
  children: ReactNode
  fields: T
  handleValidation: (configurator: T) => Error[]
}

const ConfiguratorContext = createContext<
  ConfiguratorContextValue<any> | undefined
>(undefined)

export function ConfiguratorProvider<T>({
  children,
  fields,
  handleValidation,
}: ConfiguratorProviderProps<T>) {
  const [configurator, setConfigurator] = useState<T>(fields)

  const [invalidFields, setInvalidFields] = useState<Error[]>([])

  function validateFields() {
    const errors = handleValidation(configurator)
    setInvalidFields(errors)

    return errors.length === 0
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

export function useConfiguratorContext<T>() {
  const context = useContext(ConfiguratorContext) as ConfiguratorContextValue<T>
  if (!context) {
    throw new Error(
      'useConfiguratorContext must be used within a ConfiguratorContext.Provider'
    )
  }
  return context
}
