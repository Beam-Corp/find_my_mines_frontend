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
import SplashScreen from '../../components/Game/SplashScreen'

const JoinRoom: NextPage = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { setPlayer, playerInfo } = usePlayerContext()
  const { themeColor } = useThemeContext()
  const [playerName, setPlayerName] = useState<string>('')
  const [roomId, setRoomId] = useState('')
  const [splash, setSplash] = useState(false)
  const [mounted, setMounted] = useState(false)

  const onGetRoomId = useCallback(
    (id: string) => router.push(`/game/${id}`),
    [router]
  )
  const onJoin = useCallback(() => {
    setSplash(true)
    try {
      setPlayer((prev) => {
        if (!!prev.userId) {
          const playerPrefix = prev.userId[0] + prev.userId[1]
          if (playerPrefix === '2-' || playerPrefix === '1-') {
            return {
              ...prev,
              userId: `2-${prev.userId.slice(2)}`,
              alias: playerName ? `2-${playerName}` : undefined,
            }
          }
          return {
            ...prev,
            userId: `2-${prev.userId}`,
            alias: playerName ? `2-${playerName}` : undefined,
          }
        }
        return { ...prev, alias: playerName ? `2-${playerName}` : '2-player' }
      })
      socket.emit(RoomEvents.ON_JOIN, roomId)
    } catch (err) {
      setSplash(false)
      //TODO: handle error
      alert('Cannot join this room')
      console.log(err)
    }
  }, [roomId, socket, setPlayer, playerName])

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    socket.on(RoomEvents.JOIN, onGetRoomId)
    return () => {
      socket.off(RoomEvents.JOIN, onGetRoomId)
    }
  }, [onGetRoomId, socket])

  return (
    <>
      <SplashScreen show={splash} mounted={mounted} />
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
              autoComplete="off"
              required
              onChange={(e) => setRoomId(e.target.value)}
              label="ROOM ID"
            />
            <InlineInput
              name={'name'}
              value={playerName}
              autoComplete="off"
              required={!playerInfo.userId}
              onChange={(e) => setPlayerName(e.target.value)}
              label="PLAYER NAME"
            />
          </div>
        </>
        <RoomButtonContainer>
          <Button
            size="s"
            onClick={onJoin}
            themeColor={themeColor}
            disabled={!roomId || (!playerName && !playerInfo.userId)}
          >
            JOIN GAME ROOM
          </Button>
        </RoomButtonContainer>
      </DecoratedBox>
    </>
  )
}
export default JoinRoom
