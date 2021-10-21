import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'

import router from 'next/dist/client/router'

import { Socket } from 'socket.io-client'

import { RoomEvents } from './room.event'

export const useRoomManager = (
  currentPlayer: string,
  roomId: string,
  socket: Socket
) => {
  const [players, setPlayers] = useState<string[]>([currentPlayer])
  const addPlayer = useCallback(
    (name: string) => {
      setPlayers((prev) => {
        return prev[0].substring(0, 1) === '1'
          ? prev.concat([name])
          : [name].concat(prev)
      })
    },
    [setPlayers]
  )
  const removePlayer = useCallback((name: string) => {
    setPlayers((prev) => prev.filter((n) => n !== name))
  }, [])
  const onDisconnect = useCallback(() => {
    socket.emit(RoomEvents.ON_LEAVE, { roomId, username: currentPlayer })
    router.push('/')
  }, [currentPlayer, roomId, socket])

  useEffect(() => {
    socket.on(RoomEvents.LEAVE, removePlayer)
    return () => {
      socket.off(RoomEvents.LEAVE, removePlayer)
    }
  }, [socket, players, removePlayer])

  useEffect(() => {
    if (players.length < 2) socket.on(RoomEvents.INTRODUCE, addPlayer)
    return () => {
      socket.off(RoomEvents.INTRODUCE, addPlayer)
    }
  }, [addPlayer, socket, players.length])

  useEffect(() => {
    socket.emit(RoomEvents.INTRODUCE, { roomId, username: currentPlayer })
  }, [players, socket, roomId, currentPlayer])
  return { players, onDisconnect }
}
