import React from 'react'

import styled from 'styled-components'

import { mainTheme } from '../utils/themeConst'
import { TextContainer } from './Container'

export const Input = styled.input`
  background-color: transparent;
  padding: 10px 20px;
  border: 5px solid ${mainTheme.secondary}};
  border-radius: 30px;
  color: ${mainTheme.primary};
  font-size: ${mainTheme.spacing(3)};
  &:focus {
    border-color: ${mainTheme.primary};
    transition: 0.5s;
    color: ${mainTheme.secondary};
  }
  &:focus-visible {
      outline: 0;
  }
`
const LabelContainer = styled(TextContainer)`
  color: ${mainTheme.primary};
`
const InlineWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 23px;
`
export const InlineInput = ({
  name,
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  return (
    <InlineWrapper>
      <LabelContainer size={3} weight={900} color={mainTheme.primary}>
        <label htmlFor={name}>{label}</label>
      </LabelContainer>
      <Input name={name} {...rest} style={{ marginLeft: '10px' }} />
    </InlineWrapper>
  )
}
