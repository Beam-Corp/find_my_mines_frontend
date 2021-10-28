import React, { useState, useCallback } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Axios from 'axios'
import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { client } from '../../utils/axiosClient'
import { Player, usePlayerContext } from '../../utils/usePlayerContext'

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Auth: NextPage = () => {
  const router = useRouter()
  const { setPlayerInfo, setPlayerCustom } = usePlayerContext()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const onLogin = useCallback(async () => {
    try {
      const { data } = await client.post<Player>('/auth/login', {
        payload: {
          userId,
          password,
        },
      })
      setPlayerInfo({ userId: data.userId, role: data.role || 'player' })
      setPlayerCustom(data.customization)
      router.push('/')
    } catch (err) {
      alert('Something went wrong')
    }
  }, [userId, password, router, setPlayerCustom, setPlayerInfo])
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
export default Auth
