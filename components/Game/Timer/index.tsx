import React, { FC } from 'react'

import styled from 'styled-components'

import { mainTheme } from '../../../utils/themeConst'
import { Column } from '../../Container'

const TimerContainer = styled(Column)`
  color: ${mainTheme.secondary};
  margin-bottom: ${mainTheme.spacing(4)};
`

const TimerText = styled.div<{ size?: number }>`
  font-size: ${({ size }) => mainTheme.spacing(size || 8)};
  line-height: 85px;
  font-weight: 900;
  text-align: center;
`

interface TimerProps {
  time: number
  isYourTurn: boolean
}

const Timer: FC<TimerProps> = ({ time, isYourTurn }) => {
  return (
    <TimerContainer>
      {isYourTurn ? (
        <>
          <TimerText>TIMER</TimerText>
          <TimerText size={12}>{time}</TimerText>
        </>
      ) : (
        <>
          <TimerText>Wait for</TimerText>
          <TimerText> your opponent</TimerText>
        </>
      )}
    </TimerContainer>
  )
}

export default Timer
