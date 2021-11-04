import React, { FC, useState, useContext, useCallback } from 'react'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox, TextContainer, Box } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { useThemeContext } from '../../useContext/useThemeContext'
import { GameEvents } from '../../utils/game/game.event'
import { SocketContext } from '../../utils/socketUtils'
import { RoomWrapper, HeadText, RoomButtonContainer } from './../room/create'

interface ResetGameProps {
  roomList: string[]
}

const DotlessBox = styled(Box)`
  height: 37vh;
`

const ResetGame: FC<ResetGameProps> = ({ roomList }) => {
  const { themeColor } = useThemeContext()
  const socket = useContext(SocketContext)

  const enum ErrorStatus {
    noInput = 'ROOM ID CANNOT BE BLANK',
    notFound = 'ROOM ID NOT FOUND',
    wrongFormat = 'ROOM ID MUST BE 4 DIGITS',
  }

  const [roomId, setRoomId] = useState<string>()
  const [errorStatus, setErrorStatus] = useState<ErrorStatus>()

  const gameRestart = useCallback(() => {
    if (roomId === '' || roomId === undefined) {
      return setErrorStatus(ErrorStatus.noInput)
    }
    if (roomId?.length !== 4) {
      return setErrorStatus(ErrorStatus.wrongFormat)
    }
    if (roomId && !roomList.includes(roomId)) {
      return setErrorStatus(ErrorStatus.notFound)
    }
    setErrorStatus(undefined)
    socket.emit(GameEvents.RESTART, {
      roomId: roomId,
      bombNumber: 11,
      gridSize: 6,
    })
  }, [
    roomId,
    socket,
    ErrorStatus.notFound,
    ErrorStatus.wrongFormat,
    ErrorStatus.noInput,
    roomList,
  ])

  return (
    <>
      <DotlessBox themeColor={themeColor}>
        <RoomWrapper>
          <div>
            <InlineInput
              name={'host'}
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              label="ROOM ID"
            />
          </div>
        </RoomWrapper>
        <text
          style={{
            textAlign: 'center',
            color: 'white',
            height: '30px',
            marginTop: '-15px',
          }}
        >
          {errorStatus}
        </text>
        <RoomButtonContainer>
          <Button
            size="s"
            color={themeColor.primary}
            onClick={gameRestart}
            themeColor={themeColor}
          >
            RESET
          </Button>
        </RoomButtonContainer>
      </DotlessBox>
    </>
  )
}

export default ResetGame
