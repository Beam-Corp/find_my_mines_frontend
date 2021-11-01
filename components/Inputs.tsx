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
export const InputSmall = styled.input<{ themeColor: ThemeColorProps }>`
  background-color: transparent;
  //padding: 10px 32px;
  padding: 10px;
  text-align: center;
  width: 100px;
  border: 5px solid  ${({ themeColor }) => themeColor.secondary}};
  border-radius: 30px;
  color: ${({ themeColor }) => themeColor.primary};
  font-size: ${mainTheme.spacing(3)};
  &:focus {
    border-color: ${({ themeColor }) => themeColor.primary};
    transition: 0.5s;
    color:  ${({ themeColor }) => themeColor.secondary};
  }
  &:focus-visible {
      outline: 0;
  }
`

const LabelContainer = styled(TextContainer)<{ themeColor: ThemeColorProps }>`
  min-width: 170px;
  color: ${({ themeColor }) => themeColor.primary};
`

const LabelContainer2 = styled(TextContainer)<{ themeColor: ThemeColorProps }>`
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

const InlineWrapper2 = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
  align-items: center;
  margin-right: 55px;
  margin-bottom: -23px;
`
export const InlineInput = ({
  name,
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  const { themeColor } = useThemeContext()
  return (
    <InlineWrapper>
      <LabelContainer
        size={3}
        weight={900}
        color={themeColor.primary}
        themeColor={themeColor}
      >
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

export const InlineInputSmall = ({
  name,
  label,
  value,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  const theme = useThemeContext()
  return (
    <InlineWrapper2>
      <LabelContainer2 size={3} weight={900} themeColor={theme.themeColor}>
        <label htmlFor={name}>{label}</label>
      </LabelContainer2>
      <InputSmall
        name={name}
        value={value}
        {...rest}
        style={{ marginLeft: '160px', marginRight: '0px' }}
        themeColor={theme.themeColor}
      />
    </InlineWrapper2>
  )
}
