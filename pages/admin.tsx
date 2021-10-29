import React, { useEffect, useState, useContext } from 'react'

import { NextPage } from 'next'

import { DecoratedBox, TextContainer } from '../components/Container'
import { useThemeContext } from '../useContext/useThemeContext'
import { RoomEvents } from '../utils/room/room.event'
import { SocketContext } from '../utils/socketUtils'
import { HeadText } from './room/create'

interface GetPlayersResp {
  current: number
  roomList: string[]
}
const Admin: NextPage = () => {
  const socket = useContext(SocketContext)
  const { themeColor } = useThemeContext()
  const [currentPlayers, setCurrentPlayers] = useState<number>()
  const [roomLists, setRoomLists] = useState<string[]>(['test'])

  const onGetPlayers = (res: GetPlayersResp) => {
    console.log(res)
    setCurrentPlayers(res.current)
    setRoomLists(res.roomList)
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
      <HeadText size={9} weight={900} themeColor={themeColor}>
        Concurrent Players
      </HeadText>
      <DecoratedBox>
        <HeadText size={5} weight={800} themeColor={themeColor}>
          {currentPlayers !== 0 && !currentPlayers
            ? 'loading...'
            : `${currentPlayers} players`}
        </HeadText>
        {roomLists?.map((roomId, index) => (
          <div key={`room-${index}`}>{roomId}</div>
        ))}
      </DecoratedBox>
    </>
  )
}
export default Admin
