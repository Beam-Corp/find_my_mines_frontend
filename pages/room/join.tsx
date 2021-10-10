import React, { useCallback, useContext, useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

import { Socket } from 'socket.io-client'
import styled from 'styled-components'

import { SocketContext } from '../../utils/socketUtils'
import { RoomEvents } from './room.event'

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 71px 63px;
  border: 5px solid #b537f2;
  border-radius: 4px;
`
const JoinRoom: NextPage = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const [roomId, setRoomId] = useState('')
  const onJoin = useCallback(() => {
    try {
      socket.emit(RoomEvents.ON_JOIN, roomId)
      router.push(`/game/${roomId}`)
    } catch (err) {
      //TODO: handle error
      alert('Cannot join this room')
      console.log(err)
    }
  }, [roomId, socket, router])
  return (
    <Wrapper>
      <h1>Join Room</h1>
      <div>
        <label>ROOM ID: </label>
        <span>
          <input value={roomId} onChange={(e) => setRoomId(e.target.value)} type="text"></input>
        </span>
        <div>
          <button onClick={onJoin}>JOIN GAME ROOM</button>
        </div>
      </div>
    </Wrapper>
  )
}
export default JoinRoom
