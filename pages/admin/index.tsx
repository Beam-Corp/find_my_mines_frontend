import React, { useEffect, useState, useContext, useCallback } from 'react'

import { NextPage } from 'next'

import styled from 'styled-components'

import { Row, Column } from '../../components/Container'
import { DecoratedBox, TextContainer } from '../../components/Container'
import { RoomEvents } from '../../utils/room/room.event'
import { SocketContext } from '../../utils/socketUtils'
import { mainTheme } from '../../utils/themeConst'
import { RoomWrapper } from './../room/create'
import { HeadText } from './../room/create'
import ConcurrentPlayer from './concurrentPlayers'
import ConcurrentRoomId from './concurrentRoomId'
import ResetGame from './resetGame'

import ChatBox from '../../components/Game/ChatBox'

interface GetPlayersResp {
  current: number
  roomList: string[]
}

const AdminContainer = styled(Row)`
  width: 100%;
  height: 90vh;
  justify-content: space-evenly;
`
const MenuColumn = styled(Column)`
  height: 100%;
`

const Admin: NextPage = () => {
  const socket = useContext(SocketContext)
  const [currentPlayerNumber, setCurrentPlayerNumber] = useState<number>()
  const [roomLists, setRoomLists] = useState<string[]>([])

  const onGetPlayers = useCallback((res: GetPlayersResp) => {
    console.log(res)
    setCurrentPlayerNumber(res.current - 2) // minus 2 because of admin's connection
    setRoomLists(res.roomList)
  },[])
  useEffect(() => {
    socket.emit(RoomEvents.ON_GET_PLAYERS)
  }, [socket])

  useEffect(() => {
    socket.on(RoomEvents.GET_PLAYERS, onGetPlayers)
    return () => {
      socket.off(RoomEvents.GET_PLAYERS, onGetPlayers)
    }
  }, [socket, onGetPlayers])
  return (
    <AdminContainer>
      <MenuColumn>
        <ConcurrentPlayer currentPlayerNumber={currentPlayerNumber} />
        <div style={{height: "6vh"}} />
        <ResetGame roomList={roomLists} />
      </MenuColumn>
      <MenuColumn>
        <ConcurrentRoomId roomLists={roomLists} />
      </MenuColumn>
    </AdminContainer>
  )
}
export default Admin