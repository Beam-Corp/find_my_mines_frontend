import React, { useCallback, useContext, useEffect, useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox } from '../../components/Container'
import { InlineInput } from '../../components/Inputs'
import { useThemeContext } from '../../useContext/useThemeContext'
import { RoomEvents } from '../../utils/room/room.event'
import { SocketContext } from '../../utils/socketUtils'
import { usePlayerContext } from '../../utils/usePlayerContext'
import { HeadText, RoomButtonContainer, ReturnButtonContainer } from './create'

const JoinRoom: NextPage = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { setPlayer } = usePlayerContext()
  const { themeColor } = useThemeContext()
  const [playerName, setPlayerName] = useState<string>('')
  const [roomId, setRoomId] = useState('')
  const onGetRoomId = useCallback(
    (id: string) => router.push(`/game/${id}`),
    [router]
  )
  const onJoin = useCallback(() => {
    try {
      setPlayer((prev) => {
        if (prev.userId) {
          const playerPrefix = prev.userId[0] + prev.userId[1]
          if (playerPrefix === '2-' || playerPrefix === '1-') {
            return { ...prev, userId: `2-${prev.userId.slice(2)}` }
          }
          return { ...prev, userId: `2-${prev.userId}` }
        }
        return prev
      })
      socket.emit(RoomEvents.ON_JOIN, roomId)
    } catch (err) {
      //TODO: handle error
      alert('Cannot join this room')
      console.log(err)
    }
  }, [roomId, socket, setPlayer])

  useEffect(() => {
    setPlayer((prev) => {
      return {
        ...prev,
        alias: playerName ? `2-${playerName}` : undefined,
      }
    })
  }, [playerName, setPlayer])

  useEffect(() => {
    socket.on(RoomEvents.JOIN, onGetRoomId)
    return () => {
      socket.off(RoomEvents.JOIN, onGetRoomId)
    }
  }, [onGetRoomId, socket])

  return (
    <>
      <ReturnButtonContainer>
        <Link href="/" passHref>
          <Button size="s" themeColor={themeColor}>
            RETURN TO TITLE
          </Button>
        </Link>
      </ReturnButtonContainer>
      <HeadText size={9} weight={900} themeColor={themeColor}>
        Join Room
      </HeadText>
      <DecoratedBox>
        <>
          <div>
            <InlineInput
              name={'id'}
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              label="ROOM ID"
            />
            <InlineInput
              name={'name'}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              label="PLAYER NAME"
            />
          </div>
        </>
        <RoomButtonContainer>
          <Button size="s" onClick={onJoin} themeColor={themeColor}>
            JOIN GAME ROOM
          </Button>
        </RoomButtonContainer>
      </DecoratedBox>
    </>
  )
}
export default JoinRoom
