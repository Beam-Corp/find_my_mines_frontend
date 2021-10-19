import React from 'react'

import styled from 'styled-components'

import { mainTheme } from '../utils/themeConst'

interface DefaultButtonProps {
  onClick: () => void
  color: string
  size?: 'm' | 's'
}

export const Button = styled.button<{
  size?: string // should be from theme
}>`
  min-width: ${(props) => (props.size === 's' ? '350px' : '404px')};
  min-height: ${(props) => (props.size === 's' ? '63px' : '93px')};
  border: 5px solid ${mainTheme.primary};
  box-sizing: border-box;
  border-radius: 30px;
  font-weight: 900;
  font-size: 30px;
  line-height: 35px;
  padding: 0 20px;
  color: ${mainTheme.primary};
  background-color: transparent;
  &:hover {
    transition: 0.5s;
    color: ${mainTheme.secondary};
    border-color: ${mainTheme.secondary};
  }
  &:not(:hover) {
    transition: 0.5s;
    color: ${mainTheme.primary};
    border-color: ${mainTheme.primary};
  }
`
export const DefaultButton: React.FunctionComponent<DefaultButtonProps> = ({
  onClick,
  children,
  color,
}) => {
  return (
    <Button color={color} onClick={onClick}>
      {children}
    </Button>
  )
}
