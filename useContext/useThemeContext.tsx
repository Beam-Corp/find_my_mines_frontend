import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from 'react'

import { ThemeColorProps } from '../dto/themeColor.dto'
import ThemeColorList from '../styles/themeColor'

interface ThemeContextConstruct {
  onChangeTheme: (theme: 'default' | 'alternative') => void
  themeColor: ThemeColorProps
  previousThemeColor: ThemeColorProps
  theme: string
}

export const ThemeContext = createContext({} as ThemeContextConstruct)
export const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ ...props }) => {
  const [themeColor, setThemeColor] = useState<ThemeColorProps>(
    ThemeColorList.default_color
  )
  const [previousThemeColor, setPreviousThemeColor] = useState<ThemeColorProps>(ThemeColorList.alternative_color)
  const [theme, setTheme] = useState('default')
  const onChangeTheme = useCallback((theme: 'default' | 'alternative') => {
    setPreviousThemeColor(themeColor)
    if (theme === 'default') setThemeColor(ThemeColorList.default_color)
    if (theme === 'alternative') setThemeColor(ThemeColorList.alternative_color)
    setTheme(theme)
    console.log('theme color', theme)
  }, [themeColor])

  const value: ThemeContextConstruct = {
    onChangeTheme: onChangeTheme,
    themeColor: themeColor,
    previousThemeColor: previousThemeColor,
    theme: theme,
  }

  return <ThemeContext.Provider {...props} value={value} />
}

export default ThemeProvider
