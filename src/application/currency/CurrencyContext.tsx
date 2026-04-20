import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CurrencySettingsRepository } from '../../infrastructure/repositories/CurrencySettingsRepository'

interface CurrencyContextValue {
  cupPerUsd: number
}

const CurrencyContext = createContext<CurrencyContextValue>({ cupPerUsd: 1 })

const repo = new CurrencySettingsRepository()

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [cupPerUsd, setCupPerUsd] = useState(1)

  useEffect(() => {
    repo.getSettings().then((settings) => {
      if (settings) setCupPerUsd(settings.cupPerUsd)
    })
  }, [])

  return (
    <CurrencyContext.Provider value={{ cupPerUsd }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
