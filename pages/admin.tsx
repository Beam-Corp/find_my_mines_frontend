import React, { useEffect, useState, useContext } from 'react'

import { NextPage } from 'next'

import { DecoratedBox, TextContainer } from '../components/Container'
import { RoomEvents } from '../utils/room/room.event'
import { SocketContext } from '../utils/socketUtils'
import { mainTheme } from '../utils/themeConst'
import { RoomWrapper } from './room/create'
import { HeadText } from './room/create'

interface GetPlayersResp {
  current: number
}
const Admin: NextPage = () => {
  const socket = useContext(SocketContext)
  const [currentPlayers, setCurrentPlayers] = useState<number>()
  const onGetPlayers = (res: GetPlayersResp) => {
    console.log(res)
    setCurrentPlayers(res.current)
  }
  useEffect(() => {
    socket.emit(RoomEvents.ON_GET_PLAYERS)
  }, [socket])
  useEffect(() => {
    socket.on(RoomEvents.GET_PLAYERS, onGetPlayers)
    return () => {
      socket.off(RoomEvents.GET_PLAYERS, onGetPlayers)
    }
  }, [socket])
  return (
    <>
      <HeadText size={9} weight={900}>
        Concurrent Players
      </HeadText>
      <DecoratedBox>
        <RoomWrapper>
          <HeadText size={5} weight={800}>
            {currentPlayers !== 0 && !currentPlayers
              ? 'loading...'
              : `${currentPlayers} players`}
          </HeadText>
        </RoomWrapper>
      </DecoratedBox>
    </>
  )
}
export default Admin
