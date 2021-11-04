import React, { FC, useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'

import { ThemeColorProps } from '../dto/themeColor.dto'
import { useThemeContext } from '../useContext/useThemeContext'
import { client } from '../utils/axiosClient'
import { usePlayerContext } from '../utils/usePlayerContext'
import { Row, TextContainer } from './Container'
import IconToggleButton from './IconToggleButton'

interface ControllerProps {}

const ControllerContainer = styled(Row)<{
  hide: boolean
  themeColor: ThemeColorProps
}>`
  position: absolute;
  z-index: 999;

  display: flex;
  justify-content: space-around;
  align-items: center;

  bottom: 160px;
  left: ${({ hide }) => (!hide ? '0px' : '-248px')};
  padding: 16px 8px 16px 16px;

  width: 320px;

  background: ${({ themeColor }) => themeColor.background};
  border: ${({ themeColor }) => themeColor.secondary} 4px solid;
  border-left: 0px;
  border-radius: 0px 16px 16px 0px;
  backdrop-filter: blur(5px);

  color: ${({ themeColor }) => themeColor.secondary};

  transition: left 500ms;
`

interface Statistics {
  winCount: number
  drawCount: number
  loseCount: number
}

const GameStatDisplay: FC<ControllerProps> = () => {
  const { themeColor } = useThemeContext()
  const { playerInfo } = usePlayerContext()

  const [hide, setHide] = useState<boolean>(false)

  const [stat, setStat] = useState<Statistics>({
    winCount: 0,
    drawCount: 0,
    loseCount: 0,
  })

  const getStats = useCallback(async () => {
    const playerData = await client.get(
      `/player/stats?userId=${playerInfo.userId}`
    )
    console.log(playerData.data)
    setStat(playerData.data.statistics)
  }, [playerInfo])

  useEffect(() => {
    if (playerInfo.userId) {
      getStats()
    }
  }, [getStats])

  return (
    <>
      <ControllerContainer themeColor={themeColor} hide={hide}>
        <TextContainer size={4}>{playerInfo?.userId}</TextContainer>
        <TextContainer size={4}>
          W/D/L: {stat.winCount}/{stat.drawCount}/{stat.loseCount}
        </TextContainer>
        <IconToggleButton
          imagePaths={['/arrowLeft.svg', '/arrowRight.svg']}
          handleToggle={() => setHide(!hide)}
        />
      </ControllerContainer>
    </>
  )
}

export default GameStatDisplay
