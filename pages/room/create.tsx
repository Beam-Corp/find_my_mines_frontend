import React, { useCallback, useContext, useState, useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox, TextContainer } from '../../components/Container'
import { InlineInput, Input } from '../../components/Inputs'
import { RoomEvents } from '../../utils/room/room.event'
import { SocketContext } from '../../utils/socketUtils'
import { mainTheme } from '../../utils/themeConst'

export const RoomWrapper = styled.div`
  margin: 20px 0 0 0;
  min-width: 594px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const HeadText = styled(TextContainer)`
  padding-bottom: 20px;
  color: ${mainTheme.primary};
`
export const RoomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CreateRoom: NextPage = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const [hostName, setHostName] = useState('')
  const onGetRoomId = useCallback(
    (id: string) => router.push(`/game/${id}`),
    [router]
  )
  const onCreate = useCallback(() => {
    try {
      socket.emit(RoomEvents.ON_CREATE)
    } catch (err) {
      //TODO: handle error
      alert('Cannot join this room')
      console.log(err)
    }
  }, [socket])
  useEffect(() => {
    socket.on(RoomEvents.CREATE, onGetRoomId)
    return () => {
      socket.off(RoomEvents.CREATE, onGetRoomId)
    }
  }, [socket, router, onGetRoomId])
  return (
    <>
      <HeadText size={9} weight={900}>
        Create Room
      </HeadText>
      <DecoratedBox>
        <RoomWrapper>
          <div>
            <InlineInput
              name={'host'}
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              label="ROOM HOST"
            />
          </div>
        </RoomWrapper>
        <RoomButtonContainer>
          <Button size="s" color={mainTheme.primary} onClick={onCreate}>
            CREATE GAME ROOM
          </Button>
        </RoomButtonContainer>
      </DecoratedBox>
    </>
  )
}
export default CreateRoom
