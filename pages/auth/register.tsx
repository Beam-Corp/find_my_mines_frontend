import React, { useState } from 'react'

import { NextPage } from 'next'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { ButtonWrapper } from './index'

export const Register: NextPage = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  return (
    <DecoratedBox>
      <div>
        <InlineInput
          label="USER ID"
          name={'userId'}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <InlineInput
          label="PASSWORD"
          name={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <ButtonWrapper>
        <Button>SUBMIT</Button>
      </ButtonWrapper>
    </DecoratedBox>
  )
}
