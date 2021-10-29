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
import { usePlayerContext } from '../../utils/usePlayerContext'

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
  const { setPlayer } = usePlayerContext()

  const [hostName, setHostName] = useState('')
  const onGetRoomId = useCallback(
    (id: string) => {
      setPlayer((prev) => {
        if (!!prev.userId) {
          const playerPrefix = prev.userId[0] + prev.userId[1]
          if (playerPrefix === '2-' || playerPrefix === '1-') {
            return { ...prev, userId: `1-${prev.userId.slice(2)}` }
          }
          return { ...prev, userId: `1-${prev.userId}` }
        }
        return prev
      })
      router.push(`/game/${id}`)
    },
    [router, setPlayer]
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
    setPlayer((prev) => {
      return {
        ...prev,
        alias: hostName ? `1-${hostName}` : undefined,
      }
    })
  }, [hostName, setPlayer])

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
        <div>
          <InlineInput
            name={'host'}
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            label="ROOM HOST"
          />
        </div>
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
