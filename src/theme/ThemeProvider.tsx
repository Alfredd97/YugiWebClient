import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { theme, type AppTheme } from './theme'

const ThemeContext = createContext<AppTheme>(theme)

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

