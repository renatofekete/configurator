import { createContext, useContext, ReactNode, useState } from 'react'

type Error = {
  field: string
  message: string
}

type ConfiguratorContextValue<T> = {
  configurator: T | undefined
  setConfigurator: React.Dispatch<React.SetStateAction<T>>
  invalidFields: Error[]
  setInvalidFields: React.Dispatch<React.SetStateAction<Error[]>>
}

type ConfiguratorProviderProps = {
  children: ReactNode
}

const ConfiguratorContext = createContext<
  ConfiguratorContextValue<any> | undefined
>(undefined)

export function ConfiguratorProvider<T>({
  children,
}: ConfiguratorProviderProps) {
  const [configurator, setConfigurator] = useState<T | undefined>(undefined)
  const [invalidFields, setInvalidFields] = useState<Error[]>([])

  return (
    <ConfiguratorContext.Provider
      value={{
        configurator,
        setConfigurator,
        invalidFields,
        setInvalidFields,
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
