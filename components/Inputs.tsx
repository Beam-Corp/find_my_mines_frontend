import React from 'react'

import styled from 'styled-components'

import { ThemeColorProps } from '../dto/themeColor.dto'
import { useThemeContext } from '../useContext/useThemeContext'
import { mainTheme } from '../utils/themeConst'
import { TextContainer } from './Container'

export const Input = styled.input<{ themeColor: ThemeColorProps }>`
  background-color: transparent;
  padding: 10px 20px;
  border: 5px solid ${({ themeColor }) => themeColor.secondary}};
  border-radius: 30px;
  color: ${({ themeColor }) => themeColor.primary};
  font-size: ${mainTheme.spacing(3)};
  &:focus {
    border-color: ${({ themeColor }) => themeColor.primary};
    transition: 0.5s;
    color: ${({ themeColor }) => themeColor.secondary};
  }
  &:focus-visible {
      outline: 0;
  }
`
const LabelContainer = styled(TextContainer)<{ themeColor: ThemeColorProps }>`
  min-width: 170px;
  color: ${({ themeColor }) => themeColor.primary};
`
const InlineWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 23px;
`

const Label = styled.label<{ themeColor: ThemeColorProps }>`
  color: ${({ themeColor }) => themeColor.primary};
`

export const InlineInput = ({
  name,
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  const { themeColor } = useThemeContext()
  return (
    <InlineWrapper>
      <LabelContainer size={3} weight={900} color={themeColor.primary} themeColor={themeColor}>
        <Label htmlFor={name} themeColor={themeColor}>
          {label}
        </Label>
      </LabelContainer>
      <Input
        name={name}
        {...rest}
        style={{ marginLeft: '10px' }}
        themeColor={themeColor}
      />
    </InlineWrapper>
  )
}
