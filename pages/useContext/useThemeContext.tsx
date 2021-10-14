import {useContext, createContext, useEffect, useState, useCallback} from 'react'

interface ThemeContextConstruct {
    onChangeTheme: (theme: "default" | "alternative") => void
    themeColor: "default" | "alternative"
}

export const ThemeContext = createContext({} as ThemeContextConstruct)
export const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ ...props }) => {
    const [themeColor, setThemeColor] = useState<"default" | "alternative">("default")
    const onChangeTheme = useCallback((theme: "default" | "alternative") => {
        setThemeColor(theme)
    }, []) 

    const value: ThemeContextConstruct = {
        onChangeTheme: onChangeTheme,
        themeColor: themeColor
    }

    return <ThemeContext.Provider {...props} value={value} />
}

export default ThemeProvider;