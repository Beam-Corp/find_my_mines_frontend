import React, { useState, useCallback } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Axios from 'axios'
import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { client } from '../../utils/axiosClient'

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Auth: NextPage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const onLogin = useCallback(async () => {
    try {
      const player = await client.post('/auth/login', {
        payload: {
          userId,
          password,
        },
      })
      router.push('/')
    } catch (err) {
      alert('Something went wrong')
    }
  }, [userId, password, router])
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
        <Button onClick={onLogin}>LOGIN</Button>
        <Button onClick={() => router.push('/auth/register')}>SIGN UP</Button>
      </ButtonWrapper>
    </DecoratedBox>
  )
}
