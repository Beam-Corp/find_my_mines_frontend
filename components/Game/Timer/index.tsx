import React, { FC } from 'react'

import styled from 'styled-components'

import { mainTheme } from '../../../utils/themeConst'
import { Column } from '../../Container'
import { ThemeColorProps } from '../../../dto/themeColor.dto' 

const TimerContainer = styled(Column)<{themeColor: ThemeColorProps}>`
  color: ${({themeColor}) => themeColor.secondary};
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
  themeColor: ThemeColorProps
}

const Timer: FC<TimerProps> = ({ time, isYourTurn, themeColor }) => {
  return (
    <TimerContainer themeColor={themeColor}>
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
