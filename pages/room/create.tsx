import React, { useCallback, useContext, useState, useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { DecoratedBox, TextContainer } from '../../components/Container'
import { InlineInput, Input } from '../../components/Inputs'
import { ThemeColorProps } from '../../dto/themeColor.dto'
import { useThemeContext } from '../../useContext/useThemeContext'
import { RoomEvents } from '../../utils/room/room.event'
import { SocketContext } from '../../utils/socketUtils'
import { usePlayerContext } from '../../utils/usePlayerContext'
import SplashScreen from '../../components/Game/SplashScreen'

export const RoomWrapper = styled.div`
  margin: 20px 0 0 0;
  min-width: 594px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const HeadText = styled(TextContainer)<{ themeColor: ThemeColorProps }>`
  padding-bottom: 20px;
  color: ${({ themeColor }) => themeColor.primary};
`
export const RoomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ReturnButtonContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
`

const CreateRoom: NextPage = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { setPlayer, playerInfo } = usePlayerContext()
  const { themeColor } = useThemeContext()

  const [hostName, setHostName] = useState('')
  const [splash, setSplash] = useState(false)
  const [mounted, setMounted] = useState(false)

  const onGetRoomId = useCallback(
    async (id: string) => {
      setPlayer((prev) => {
        if (!!prev.userId) {
          const playerPrefix = prev.userId[0] + prev.userId[1]
          if (playerPrefix === '2-' || playerPrefix === '1-') {
            return {
              ...prev,
              userId: `1-${prev.userId.slice(2)}`,
              alias: hostName ? `1-${hostName}` : undefined,
            }
          }
          return {
            ...prev,
            userId: `1-${prev.userId}`,
            alias: hostName ? `1-${hostName}` : undefined,
          }
        }
        return { ...prev, alias: hostName ? `1-${hostName}` : '1-player' }
      })
      router.push(`/game/${id}`)
    },
    [router, setPlayer, hostName]
  )
  const onCreate = useCallback(() => {
    setSplash(true)
    try {
      socket.emit(RoomEvents.ON_CREATE)
    } catch (err) {
      //TODO: handle error
      alert('Cannot join this room')
      console.log(err)
    }
  }, [socket])

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    socket.on(RoomEvents.CREATE, onGetRoomId)
    return () => {
      socket.off(RoomEvents.CREATE, onGetRoomId)
    }
  }, [socket, router, onGetRoomId])

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
        Create Room
      </HeadText>
      <DecoratedBox>
        <div>
          <InlineInput
            name={'host'}
            value={hostName}
            autoComplete="off"
            onChange={(e) => setHostName(e.target.value)}
            required={!playerInfo.userId}
            label="ROOM HOST"
          />
        </div>
        <RoomButtonContainer>
          <Button
            size="s"
            color={themeColor.primary}
            onClick={onCreate}
            themeColor={themeColor}
            disabled={!playerInfo.userId && !hostName}
          >
            CREATE GAME ROOM
          </Button>
        </RoomButtonContainer>
      </DecoratedBox>
    </>
  )
}
export default CreateRoom
