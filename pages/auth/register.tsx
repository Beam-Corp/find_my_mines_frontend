import React, { useCallback, useState } from 'react'

import { NextPage } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { client } from '../../utils/axiosClient'
import { Player } from '../../utils/usePlayerContext'
import { ButtonWrapper } from './index'

const Register: NextPage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = useCallback(async () => {
    try {
      const isSuccessful = await client.post<boolean>('/auth/register', {
        userId,
        password,
        customization: {} as Player,
      })
      if (!isSuccessful.data) throw new ApiError(500, '')
      router.push('/auth/login')
    } catch (err) {
      alert('something went wrong')
    }
  }, [password, userId, router])
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
        {/* should also add customization inputs */}
      </div>
      <ButtonWrapper>
        <Button onClick={onSubmit}>SUBMIT</Button>
      </ButtonWrapper>
    </DecoratedBox>
  )
}

export default Register
