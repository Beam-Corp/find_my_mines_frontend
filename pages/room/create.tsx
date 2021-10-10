import React, { useCallback, useContext, useState, useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'

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
const CreateRoom: NextPage = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const [hostName, setHostName] = useState('')
  const onCreate = useCallback(() => {
    try {
      socket.emit(RoomEvents.ON_CREATE)

      //TODO: route to game page
    } catch (err) {
      //TODO: handle error
      alert('Cannot join this room')
      console.log(err)
    }
  }, [socket])
  const onGetRoomId = useCallback((id: string) => router.push(`/game/${id}`), [router])
  useEffect(() => {
    socket.on(RoomEvents.CREATE, onGetRoomId)
    return () => {
      socket.off(RoomEvents.CREATE, onGetRoomId)
    }
  }, [socket, router, onGetRoomId])
  return (
    <Wrapper>
      <h1>Create Room</h1>
      <div>
        <label>HOST NAME: </label>
        <span>
          <input value={hostName} onChange={(e) => setHostName(e.target.value)} type="text"></input>
        </span>
        <div>
          <button onClick={onCreate}>CREATE GAME ROOM</button>
        </div>
      </div>
    </Wrapper>
  )
}
export default CreateRoom
