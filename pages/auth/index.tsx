import React, { useState } from 'react'

import { NextPage } from 'next'

import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'

export const Auth: NextPage = () => {
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
          label="USER ID"
          name={'userId'}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
    </DecoratedBox>
  )
}
