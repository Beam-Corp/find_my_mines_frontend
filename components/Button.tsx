import React from 'react'

import styled from 'styled-components'

import { ThemeColorProps } from '../dto/themeColor.dto'
import { useThemeContext } from '../useContext/useThemeContext'

interface DefaultButtonProps {
  onClick: () => void
  color: string
  size?: 'm' | 's'
}

export const Button = styled.button<{
  size?: string // should be from theme
  themeColor: ThemeColorProps
}>`
  min-width: ${(props) => (props.size === 's' ? '350px' : '404px')};
  min-height: ${(props) => (props.size === 's' ? '63px' : '93px')};
  border: 5px solid ${({ themeColor }) => themeColor.primary};
  box-sizing: border-box;
  border-radius: 30px;
  font-weight: 900;
  font-size: 30px;
  line-height: 35px;
  padding: 0 20px;
  color: ${({ themeColor }) => themeColor.primary};
  background-color: transparent;
  &:hover {
    transition: 0.5s;
    color: ${({ themeColor }) => themeColor.secondary};
    border-color: ${({ themeColor }) => themeColor.secondary};
  }
  &:not(:hover) {
    transition: 0.5s;
    color: ${({ themeColor }) => themeColor.primary};
    border-color: ${({ themeColor }) => themeColor.primary};
  }
`
export const DefaultButton: React.FunctionComponent<DefaultButtonProps> = ({
  onClick,
  children,
  color,
}) => {
  const { themeColor } = useThemeContext()
  return (
    <Button color={color} onClick={onClick} themeColor={themeColor}>
      {children}
    </Button>
  )
}
