import React, { FC } from 'react'

import styled from 'styled-components'

import { ThemeColorProps } from '../../../dto/themeColor.dto'
import { useThemeContext } from '../../../useContext/useThemeContext'
import { mainTheme } from '../../../utils/themeConst'
import { Column } from '../../Container'

const TimerContainer = styled(Column)<{ themeColor: ThemeColorProps }>`
  color: ${({ themeColor }) => themeColor.secondary};
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

const Timer: FC<TimerProps> = ({ time, isYourTurn}) => {
  const { themeColor } = useThemeContext()
  const gameResumeDisplay = (
    <>
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
    </>
  )
  // const gameEndDisplay = (
  //   <>
  //     <TimerText>Game Over</TimerText>
  //     <TimerText>--------------</TimerText>
  //   </>
  // )
  return (
    <TimerContainer themeColor={themeColor}>
      {gameResumeDisplay}
    </TimerContainer>
  )
}

export default Timer
