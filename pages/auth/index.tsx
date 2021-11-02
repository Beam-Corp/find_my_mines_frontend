import React, { useState, useCallback, useEffect } from 'react'

import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Axios from 'axios'
import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { useThemeContext } from '../../useContext/useThemeContext'
import { client } from '../../utils/axiosClient'
import { Player, usePlayerContext } from '../../utils/usePlayerContext'
import { ReturnButtonContainer } from '../room/create'

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  & button {
    margin-bottom: 20px;
  }
`
const Auth: NextPage = () => {
  const router = useRouter()
  const { setPlayer } = usePlayerContext()
  const theme = useThemeContext()
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
      setPlayer(data)
      router.push('/')
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setUserId('')
      setPassword('')
    }
  }, [userId, password, router, setPlayer])
  return (
    <>
      <ReturnButtonContainer>
        <Link href="/" passHref>
          <Button size="s" themeColor={theme.themeColor}>
            RETURN TO TITLE
          </Button>
        </Link>
      </ReturnButtonContainer>
      <DecoratedBox>
        <div>
          <InlineInput
            label="USER ID"
            name={'userId'}
            value={userId}
            autoComplete="off"
            onChange={(e) => setUserId(e.target.value)}
          />
          <InlineInput
            label="PASSWORD"
            name={'password'}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ButtonWrapper>
          <Button themeColor={theme.themeColor} onClick={onLogin} size="s">
            LOGIN
          </Button>
          <Button
            themeColor={theme.themeColor}
            onClick={() => router.push('/auth/register')}
            size="s"
          >
            SIGN UP
          </Button>
        </ButtonWrapper>
      </DecoratedBox>
    </>
  )
}
export default Auth
