import { createContext, useContext, ReactNode, useState } from 'react'

export type ConfiguratorContextType = {
  name: string
  telephone: string
  email: string
  manufacturer: string
  services: string[]
  coupon: string
  note: string
}

interface ConfiguratorContextValue {
  configurator: ConfiguratorContextType
  setConfigurator: React.Dispatch<React.SetStateAction<ConfiguratorContextType>>
}

export const ConfiguratorContext = createContext<
  ConfiguratorContextValue | undefined
>(undefined)

interface ConfiguratorProviderProps {
  children: ReactNode
}

export function ConfiguratorProvider({ children }: ConfiguratorProviderProps) {
  const [configurator, setConfigurator] = useState<ConfiguratorContextType>({
    name: '',
    telephone: '',
    email: '',
    manufacturer: '',
    services: [],
    coupon: '',
    note: '',
  })

  return (
    <ConfiguratorContext.Provider value={{ configurator, setConfigurator }}>
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
