import React, { FC } from 'react'

import styled from 'styled-components'

import { mainTheme } from '../../../utils/themeConst'
import { Column } from '../../Container'

const TimerContainer = styled(Column)`
  color: ${mainTheme.secondary};
  margin-bottom: ${mainTheme.spacing(3)};
`

const TimerText = styled.div`
  font-size: ${mainTheme.spacing(7)};
  text-align: center;
`

interface TimerProps {
  time: number
  isYourTurn: boolean
}

const Timer: FC<TimerProps> = ({ time, isYourTurn }) => {
  return (
    <TimerContainer>
      <TimerText>TIMER</TimerText>
      {isYourTurn ? <TimerText>{time}</TimerText> : <TimerText>Wait for your turn</TimerText>}
    </TimerContainer>
  )
}

export default Timer
