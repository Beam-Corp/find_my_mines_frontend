import React, { useCallback, useContext, useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { RoomEvents } from '../../utils/room/room.event'
import { SocketContext } from '../../utils/socketUtils'
import { mainTheme } from '../../utils/themeConst'
import { HeadText, RoomButtonContainer, RoomWrapper } from './create'

const JoinRoom: NextPage = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const [roomId, setRoomId] = useState('')
  const onJoin = useCallback(() => {
    try {
      socket.emit(RoomEvents.ON_JOIN, roomId)
      // router.push(`/game/${roomId}`)
    } catch (err) {
      //TODO: handle error
      alert('Cannot join this room')
      console.log(err)
    }
  }, [roomId, socket])
  return (
    <>
      <HeadText size={9} weight={900}>
        Join Room
      </HeadText>
      <DecoratedBox>
        <RoomWrapper>
          <div>
            <InlineInput
              name={'id'}
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              label="ROOM ID"
            />
          </div>
        </RoomWrapper>
        <RoomButtonContainer>
          <Button size="s" onClick={onJoin}>
            CREATE GAME ROOM
          </Button>
        </RoomButtonContainer>
      </DecoratedBox>
    </>
  )
}
export default JoinRoom
