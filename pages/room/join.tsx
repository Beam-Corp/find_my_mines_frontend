import React, { useCallback, useContext, useEffect, useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { PlayerContext } from '../../utils/playerUtils'
import { RoomEvents } from '../../utils/room/room.event'
import { SocketContext } from '../../utils/socketUtils'
import { mainTheme } from '../../utils/themeConst'
import { HeadText, RoomButtonContainer, RoomWrapper } from './create'

const JoinRoom: NextPage = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { name, setName } = useContext(PlayerContext)
  const [playerName, setPlayerName] = useState<string>('')
  const [roomId, setRoomId] = useState('')
  const onGetRoomId = useCallback(
    (id: string) => router.push(`/game/${id}`),
    [router]
  )
  const onJoin = useCallback(() => {
    try {
      socket.emit(RoomEvents.ON_JOIN, roomId)
    } catch (err) {
      //TODO: handle error
      alert('Cannot join this room')
      console.log(err)
    }
  }, [roomId, socket])

  useEffect(() => {
    setName(`2-${playerName}`)
  }, [playerName, setName])

  useEffect(() => {
    socket.on(RoomEvents.JOIN, onGetRoomId)
    return () => {
      socket.off(RoomEvents.JOIN, onGetRoomId)
    }
  }, [onGetRoomId, socket])

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
            <InlineInput
              name={'name'}
              value={name}
              onChange={(e) => setPlayerName(e.target.value)}
              label="PLAYER NAME"
            />
          </div>
        </RoomWrapper>
        <RoomButtonContainer>
          <Button size="s" onClick={onJoin}>
            JOIN GAME ROOM
          </Button>
        </RoomButtonContainer>
      </DecoratedBox>
    </>
  )
}
export default JoinRoom
