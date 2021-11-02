import React, { useCallback, useState } from 'react'

import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { useThemeContext } from '../../useContext/useThemeContext'
import { client } from '../../utils/axiosClient'
import { Player } from '../../utils/usePlayerContext'
import { ReturnButtonContainer } from '../room/create'
import { ButtonWrapper } from './index'

const Register: NextPage = () => {
  const router = useRouter()
  const theme = useThemeContext()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = useCallback(async () => {
    try {
      const isSuccessful = await client.post<boolean>('/auth/register', {
        payload: {
          userId,
          password,
          customization: {} as Player,
        },
      })
      if (!isSuccessful.data) throw new Error()
      router.push('/auth')
    } catch (err) {
      alert('something went wrong')
    } finally {
      setUserId('')
      setPassword('')
    }
  }, [password, userId, router])
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
            type="password"
            name={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* should also add customization inputs */}
        </div>
        <ButtonWrapper>
          <Button themeColor={theme.themeColor} onClick={onSubmit} size="s">
            SUBMIT
          </Button>
        </ButtonWrapper>
      </DecoratedBox>
    </>
  )
}

export default Register
