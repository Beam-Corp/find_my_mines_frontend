import React from 'react'

import styled from 'styled-components'

import { useThemeContext } from '../../useContext/useThemeContext'
import {ThemeColorProps} from '../../dto/themeColor.dto'

interface CircleProps {
  themeColor: ThemeColorProps
}

const Circle = styled.div<CircleProps>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border: 5px ${({themeColor}) => themeColor.primary} solid;
  background: ${({ themeColor }) => themeColor.secondary};
  cursor: pointer;
`

const ThemeColorButton = () => {
  const { onChangeTheme, previousThemeColor, theme } = useThemeContext()
  return (
    <Circle
      onClick={() =>
        onChangeTheme(theme === 'default' ? 'alternative' : 'default')
      }
      themeColor={previousThemeColor}
    />
  )
}

export default ThemeColorButton
